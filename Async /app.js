// ERROR LIST

// 1: There is a typo in the var HTTP
// 2. There is a typo in the functon 
// 3. Did not include async (If there is a promise the function must be async)
// 4. Did not include await. (If there is async, the code must await for async to complete the load)
// 5. The call Httpbin is asynced but not a correct function 
// 6. Missing async keyword. 
// 7. Missing await before being called 
// 8. The function myName did not return a promise 
// 9. The resolve function did not have the correct data, passed the data 
// 10. This allowed errrors, updated to prevent errrors. 




// 1
var http = require('http');

// 2
var myname = function() {
  return new Promise((resolve, reject) => {
    // 8
    console.log("Here is my IP address");
    // 9
    resolve();
  });
}

// 3
async function callHttpbin() {
  return new Promise((resolve, reject) => {
    http.get(
      'http://httpbin.org/ip',
      function(response) {
        var str = "";
        response.setEncoding('utf8');
        response.on('data', function(data) {
          str += data;
        });

        response.on('end', function() {
          var result = JSON.parse(str);
          var myips = result.origin;
          resolve(myips);
        });

        // 10
        response.on('error', function(error) {
          reject(error);
        });
      }
    );
  });
}

// 6
async function executeAsyncTask() {
  // 4
  const valueA = await callHttpbin();

//   7
  await myname();
  console.log(valueA);
}

executeAsyncTask();