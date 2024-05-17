import React from "react";  

  const PageHeading = ({icon = null, title, description }) => {
    return (
      <div className="mt-4">
        <h2 className="relative font-bold text-lg text-text dots flex items-center gap-2">{icon && <i className={icon}></i> }{title} </h2>
        <p className="leading-5 mb-4 text-subtext text-sm">
          {description}
        </p>
      </div>
    );
  };
  
  export default PageHeading;
  