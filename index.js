


exports.handler = (event, context, callback) => {
    switch (event.request.type) {
        case "LaunchRequest":
        context.succeed(generateResponse(buildSpeechletResponse("Bienvenido a los Módulos de Bnext", false)))
            break;
        case "IntentRequest":
            switch (event.request.intent.name) {
                case "ProHelloWorld":
                    context.succeed(generateResponse(buildSpeechletResponse("Hello World", true)))
                    break;
                case "Promociones":
                    // context.succeed(generateResponse(
                      // buildSpeechletResponse("La promoción de hoy, 2 tecate por 30 pesos y 15 pesos de descuento en una venta mayor a 200 pesos", true))).
                    
                    var result = "Succed";
                    console.log(result);
                    
                    const number = event.request.intent.slots.number.value;
                    
                     const https = require('https');
                     const url = 'https://jsonplaceholder.typicode.com/todos/' + number 

                     https.get(url,(response) => {
                        let todo = '';

                         response.on('data',(chunk) => {
                            todo += chunk;

                            result = "succed1";
                            console.log(result);

                         });

                         response.on('end', () => {
                            console.log(JSON.parse(todo).title);
                            
                            context.succeed(generateResponse(
                            buildSpeechletResponse(JSON.parse(todo).title, false)))
                          });
                        }).on("error", (error) => {
                            console.log("Error: " + error.message);
                        });

                    //    context.succeed(generateResponse(
                    //    buildSpeechletResponse(result, false)))
                      break;
                case "Inventarios":
                    //var c = this.event.request.intent.slots.productos.value;
                    //var intent = this.event.request.intent;
                    /*console.log('slots are -->');
                    console.log(intent.slots);
                    var shloka = intent.slots.productos;
                    //var chapter = intent.slots.chapter;
                    console.log('chapter:' + ' shloka:' + shloka);*/
                    context.succeed(generateResponse(buildSpeechletResponse("Tecate 12 onzas tiene inventario de 15 piezas", true)))
                    //context.succeed(generateResponse(buildSpeechletResponse(c, true)))
                    break;
                case "ProductosMasVendidos":
                    context.succeed(generateResponse(buildSpeechletResponse("Los productos más vendidos son, doce pack de Tecate Light, papas Sabritas clasicas y agua natural bonafont", true)))
                    break;
            }
            break;
    }
}

//create speech responses
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse) => {

  return {
    version: "1.0",
    response: speechletResponse
  }

}