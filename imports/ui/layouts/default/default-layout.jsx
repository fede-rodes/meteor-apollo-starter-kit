import React, { PropTypes } from 'react';
import HeaderContainer from '../../components/header/header.jsx';
// import Footer from '../../components/footer/footer.jsx';
// import style from './style.scss';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DefaultLayout = (props) => {
  const {
    children,
    withHeader,
    withFooter,
    centered,
    width,
    padding,
    backgroundColor,
  } = props;

  return (
    <div
      // className={style.DefaultLayout}
      style={{ backgroundColor }}
    >
      {withHeader && <HeaderContainer />}
      <main
        className={`flex justify-center ${centered ? 'items-center' : ''}`}
        style={{ maxWidth: width, padding }}
      >
        <div className="flex-auto">
          {children}
        </div>
      </main>
      {/* withFooter && <Footer /> */}
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  withHeader: PropTypes.bool,
  withFooter: PropTypes.bool,
  centered: PropTypes.bool,
  width: PropTypes.string, // '600px', '90%', defaults to '100%'
  padding: PropTypes.string, // '0', '30px 15px', defaults to '0'
  backgroundColor: PropTypes.string,
};

DefaultLayout.defaultProps = {
  withHeader: true,
  withFooter: true,
  centered: false,
  width: '100%',
  padding: '0',
  backgroundColor: 'white',
};

export default DefaultLayout;
