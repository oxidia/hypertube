const torrentStream = require('torrent-stream');
const FFmpeg = require('fluent-ffmpeg');

class MovieStream {
  constructor(options = {}) {
    this._verbose = options.verbose || false;
    this._clientSupportedFormat = options.clientSupportedFormat;
    this._convert = options.convert || false;
    this.data = {};
  }

  fromMagnet(magnet, options) {
    let isNewEngine = false;

    if (!this.data[magnet]) {
      if (this._verbose) {
        console.info('[INFO] engine creating...');
      }
      const engine = torrentStream(magnet);
      this.data[magnet] = engine;
      isNewEngine = true;
    }

    const engine = this.data[magnet];

    return new Promise((resolve, reject) => {
      if (isNewEngine) {
        return engine.on('ready', () => {
          resolve(this._start(engine, options));
        });
      }

      resolve(this._start(engine, options));
    });
  }

  fromTorrent() {
    throw { message: 'Not implemented yet' };
  }

  _transcode(stream, threads = 4) {
    const converted = new FFmpeg(stream)
      .videoCodec('libvpx')
      .audioCodec('libvorbis')
      .format('webm')
      .audioBitrate(128)
      .videoBitrate(8000)
      .outputOptions([
        `-threads ${threads}`,
        '-deadline realtime',
        '-error-resilient 1'
      ])
      .on('error', err => {
        console.log(err);
        converted && converted.destroy();
      })
      .stream();

    return converted;
  }

  _getFile(files, supportedFormat = ['mp4', 'mkv', 'ogg', 'webm', 'avi']) {
    const file = files.find(file =>
      supportedFormat.includes(file.name.split('.').pop())
    );

    return file;
  }

  _getStartEnd(range, fileSize) {
    if (!range) return { start: 0, end: fileSize - 1 };

    const parts = range.replace(/bytes=/, '').split('-');
    const partialstart = parts[0];
    const partialend = parts[1];
    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : fileSize - 1;

    return { start, end };
  }

  _getHead(range, fileSize, ext) {
    if (!range) {
      return {
        'Content-Type': `video/${ext}`
      };
    }

    const { start, end } = this._getStartEnd(range, fileSize);

    if (!fileSize) {
      return {
        'Content-Range': `bytes ${start}-${end}/*`,
        'Content-Type': `video/${ext}`
      };
    }

    return {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Content-Type': `video/${ext}`
    };
  }

  _start(engine, options) {
    const { range } = options;
    const file = this._getFile(engine.files);

    if (!file) {
      return reject(new Error('Cannot find a supported format'));
    }

    if (this._verbose) {
      console.log('[INFO]', file.name);
    }

    const ext = file.name.split('.').pop();
    const convert = !this._clientSupportedFormat.includes(ext);
    const total = file.length;
    const { start, end } = this._getStartEnd(range, total);

    if (this._verbose) {
      console.log('[INFO] sending...');
    }

    if (convert && this._convert) {
      const stream = file.createReadStream({ start, end });

      return {
        head: this._getHead(range, total, ext),
        stream: this._transcode(stream)
      };
    } else if (!convert) {
      const stream = file.createReadStream({ start, end });

      return {
        head: this._getHead(range, total, ext),
        stream
      };
    } else {
      const stream = file.createReadStream();

      return {
        head: this._getHead(range, total, ext),
        stream
      };
    }
  }
}

module.exports = MovieStream;
