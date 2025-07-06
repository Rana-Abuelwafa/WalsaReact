import React, { Component } from "react";
import InternalError from "../errorComp/internalError";

import React from "react";
import { useState } from "react";

function ErrorHandler() {
  const [errorOccurred, setErrorOccurred] = useState(false);

  //  componentDidCatch(error, info) {
  //       console.log("errrrrrrrr " , error);
  //     this.setState({ errorOccurred: true })
  //     //logErrorToMyService(error, info)
  //   }
  return <div>ErrorHandler</div>;
}

export default ErrorHandler;

// export default class ErrorHandler extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { errorOccurred: false }
//       }

//       componentDidCatch(error, info) {
//           console.log("errrrrrrrr " , error);
//         this.setState({ errorOccurred: true })
//         //logErrorToMyService(error, info)
//       }

//       render() {
//         return this.state.errorOccurred ? <InternalError/> : this.props.children
//       }
// }
