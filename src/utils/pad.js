import React from "react";

const pad = (str, maxLength = 2, fillString = "0") =>
  String(str).padStart(maxLength, fillString);

export default pad;
