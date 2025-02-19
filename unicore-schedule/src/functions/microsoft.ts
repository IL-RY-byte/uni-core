import axios from "axios";

// export async function getAccessToken(env: any): Promise<string> {
//     const response = await axios.post(
//         `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`,
//         new URLSearchParams({
//             client_id: env.CLIENT_ID,
//             client_secret: env.CLIENT_SECRET,
//             scope: 'https://graph.microsoft.com/.default',
//             grant_type: 'client_credentials'
//         }).toString(), // Переконайся, що `URLSearchParams` передається як рядок
//         {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }
//     );
//     console.log("JJJJJJJJJ");
//     console.log(response.data.access_token);

//     return response.data.access_token;

// }

// export async function getUserSchedule(email: string, env: any): Promise<any> {
//     const token = await getAccessToken(env);
//     const url = `https://graph.microsoft.com/v1.0/users/${email}/calendar/events`;


//     console.log("Fetching schedule for:", url);
//     console.log("Access Token:", token);
    
//     const userUrl = `https://graph.microsoft.com/v1.0/users/${email}`;
//     const userResponse = await fetch(userUrl, { headers: { Authorization: `Bearer ${token}` } });

//     if (!userResponse.ok) {
//         const errorText = await userResponse.text();
//         throw new Error(`Failed to fetch user: ${errorText}`);
//     }

//     console.log("AAAAAA", userResponse);

//     const response = await fetch(url, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//         }
//     });

//     if (!response.ok) {
//         const errorBody = await response.text();
//         throw new Error(`Failed to fetch schedule: ${response.statusText} - ${errorBody}`);
//     }

//     return response.json();
// }

const authorizationCode = "mytoken";

export async function getAccessToken(authorizationCode: string, env: any): Promise<string> {
    console.log("ЕЕЕЕЕ");
    const response = await axios.post(
    `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`,
    new URLSearchParams({
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      code: authorizationCode,
      redirect_uri: "https://uni-core.org/auth",
      grant_type: "authorization_code",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("JJJJJJJJJ");
  console.log(response.data.access_token);
  return response.data.access_token;
}

export async function getUserSchedule(env: any): Promise<any> {
  const token = await getAccessToken(authorizationCode, env);
  const url = "https://graph.microsoft.com/v1.0/me/calendar/events";
  console.log("AAA");
  //ОТУТ викидає помилку 
  const response = await axios.get(url, { 
    headers: {
      Authorization:   `Bearer ${token}`,
    },
  });
   
  console.log("HHHHHH", response);
  return response.data; 

}

export async function getUserGrades(env: any): Promise<any> {
  
}