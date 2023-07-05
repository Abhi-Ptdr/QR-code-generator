/* 
1. Use the inquirer npm package to get user input.
2. use the qr-image npm package to turn the user entered URL into QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer                                // copy templet from npm documentation.
  .prompt([
    {
        message: "Type in your URL: ",
        name: "URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_svg = qr.image(url);               //copied from qr-image documentation https://www.npmjs.com/package/qr-image
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile("URL.txt", url, (err) => {           //copied from file system documentation https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });