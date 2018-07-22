import * as React from "react";
import Link from 'gatsby-link'

const toc = [
  {
    name : "Introduction",
    path:"/tutorials/introduction",
  },
  {
    name : "Basic States and Transitions",
    path:"/tutorials/basic-states-and-transitions",
  },
  {
    name : "A more advanced example",
    path:"/tutorials/another-example",
  },
];

const TutorialPageWrapper = ({ Component, pathname }) => {
  let tocIdx = toc.findIndex( (o) => pathname.indexOf(o.path) > -1 ) 
  if(tocIdx === -1){
    tocIdx = 0;
  }
  const curSection = toc[tocIdx];
  const prevSection = toc[tocIdx - 1]
  const nextSection = toc[tocIdx + 1]
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <ol>
            {
              toc.map( ({path, name}, i) => <li key={i}>
                {
                  i === tocIdx ? 
                    <span>{name}</span> : 
                    <Link to={path}>{name}</Link>
                }
              </li>)
            }
          </ol>
        </div>
        <div className="col-md-9">
          <Component sectionName={curSection.name} />
          {prevSection &&
            <Link to={prevSection.path}>&lt; Previous Page ({prevSection.name})</Link>}
          {nextSection &&
            <Link className="float-right" to={nextSection.path}>Next Page ({nextSection.name}) &gt;</Link>}
        </div>
      </div> 
    </div>
  );
}

export default TutorialPageWrapper;
