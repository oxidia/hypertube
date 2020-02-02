import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Input, Button } from "antd";
import Logo from "../components/image";

const { Search } = Input;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#042A2B`,
      marginBottom: `1.45rem`,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Link
      to="/library"
      style={{
        color: `#48E5C2`,
        textDecoration: `none`,
      }}
    >
      <Logo className="img" size="Small" />
    </Link>
    <Search
      placeholder="search for movies..."
      onSearch={value => console.log(value)}
      style={{ width: '300px'}}
    />
    <div>
      <Button icon="logout" style={{margin: '0 21px'}} />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
