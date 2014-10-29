## Directory Structure

* **/**

  Here are the server.js and package.json, plus other supplementary files to the project.

* **/node_modules** (After: npm install)

  Directory where the dependencies of the node are installed.

* **/public**

  * _/css_

    This folder contains the style sheets used by the application

  * _/fonts_

    Here are the fonts (typography)

  * _/img_
    
    Images that are used on the site (like logo, markers, icons, etc)
  
  * _/js_

    In general, it contains the files used by Backbone.js and Underscore.js templates and the file who manager the map functions.
    
    - _/models_
   
      Here are the models used by the server-side (backbone model)
 
    - _/views_ 
   
      Here are the views controllers, the js files that are used to create the views dynamically. 

   * _/lib_
  
     General libraries like JQuery, Backbone.js etc
   
   * _/pics_
     
     Pictures of the plants saved through upload

   * _/templates_

     The html templates

* **/routes**

  Here are the file that contains the function routes used by Express. In addition, here is made the connection with the MongoDB