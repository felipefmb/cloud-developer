require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import {AppConfig} from './config/app/AppConfig';

import { DefaultRouter } from './controllers/v0/default.router'
import { IndexRouter } from './controllers/v0/index.router'

(async () => {

  // Init the Express application
  const app = express();
  const config = new AppConfig();

  // Set the network port
  const port = process.env.PORT || 8093;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/', DefaultRouter)
  app.use(`/api/${config.router_version}/`, IndexRouter)

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  
  //! END @TODO1
   // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();