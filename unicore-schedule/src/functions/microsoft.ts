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


export async function getAccessToken(authorizationCode: string, env: any): Promise<string> {
    try {
        console.log("Відправляємо запит на отримання токена");
        console.log("authorizationCode:", authorizationCode);
        console.log("client_id:", env.CLIENT_ID);
        console.log("tenant_id:", env.TENANT_ID);
      
        const response = await axios.post(
          `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`,
          new URLSearchParams({
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            code: authorizationCode,
            redirect_uri: "https://uni-core.org/auth",
            grant_type: "authorization_code",
            scope: "openid profile email https://graph.microsoft.com/Calendars.ReadWrite",
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
    
        console.log("✅ Отриманий токен:", response.data.access_token);
        return response.data.access_token;
      } catch (error: any) {
        console.error("❌ Помилка отримання токена:", error.response?.data || error.message);
        throw new Error("Не вдалося отримати токен доступу");
      }
}

export async function getUserSchedule(env: any): Promise<any> {
    try {
      const authorizationCode =
        "1.AUsASXKfLWnuiE65nKmU_IRUvMoTjr-6189IvLMnk9E_zcEBAABLAA.AgABBAIAAABVrSpeuWamRam2jAF1XRQEAwDs_wUA9P-sOiK6o4o_mU82VFhw1NeOeYeQ8JrwWwTxrWcY9X3Fgnd5ghfix3oQMUtzs8ajFzX1GRQbTF5dFiG8J97KEWYq_DmyHOlHPwtpFX3H1VhnZKhjznnZ7qYAawunzFeaXqdumoKHvdxXCWGuDVK_Aordlcdip6fs4K4mDLbHsh2q1uht786VMcdh0ScHUENim9nfKa9RMJGdbNj0NXFSNMRNhVnOvGR4xxvai299zPhJoQEKNJsLw-0Wb4l0SVX1hhf_ufDzZuDoBXLKb-oB-Oip6TTH_krIY-JDlw3_HizfDrJuTnEZIgWRG8F0T2mXAp_gAbqcV0ZGmspFTa-0wEmBimY5v1Okl0iFB6Qz-EisRe9ZAOyEOAIkpEVkvyhGudl4PAoN0_cExvRQP6TdfDv4hcTcWM252fr1R9-is4ga_Omx4u5nThIDrWn8uWCWYSaDi676_EgFX131qFw5xps4RfG6SGD0eBboT5SpzxqIhcHgjyE2WIyvuPAHeGYegzsMyareY6znFk-TWxNAiV7ykw1NpCDEd6aP5HE8M9e5gfrv64OqyzP5TVHt2maCKVQZeyiqEkWPniu4tUnZmVowCzN8aFFRPL7u6tk3D3WI4q89vgmpuu38dBFEZBGuHIGCMJe8ShfT2etbHx0ecEjiERg20T0F5Pqg1YI0fuGvO9ZaF7KnuIyIhvKrRRNydMYxWTXFBqlgHALlfujPqL1XL3ZwqdBkq2AgozYvThRDnMIP8WPi00aRxYDggEu6hjbntN3jluCdoTy5iJTtyu3eTR-QL6-JFHRRXU47EuRD2R3NdiVoNcDKQRqb0ps_CxUs0xhFi_87B64WX-R0VtN27V8lFIPyDVp4x3KcyUaypNEUAdb2SATdcOEv2ExdRMCQm06bgjsLuyGcqrx5SXnVGQr2sAD4fAAxybN6DyZ6dLgJmyZsQHUsjJZaHrhk2Id5rBZImWiBDrT2sM-H-cdkhgiSWC6PHj7ELgKhxKXKcSHfJk70SNM-AdV2lQ5mqjfaInmp6UHC5I4J-2hGvRRgBTB2unjFVLhNzwTvfaQJxI0KpjUmENhuOxfxN8MRoq6tyJuDhBKu5qpQyhW5p6YIVjVYLiNxUfjF4jZWYi0mFarAUKF-31JCWSBpM9p7Gk_BIwA6AM8w4OLhZyx67AYJHZbG88stFnw1t7DnOAUDIa-rsuoU53bk0CUfmrxxa39D5bBPu5EbDuO2Jo1M1mVkk3NnJuw17ajd1akDISWJZtt2fdKc-Id_unaD0uDtOnhgUXP6i66bSbxCMe0QxpzItI1D-NgtwcJ-U2RmCnyfIwqrdf5U97_rne-lDlZYPg";
  
      const token = await getAccessToken(authorizationCode, env);
      const userEmail = 'orynchuk29@gmail.com'; 
      const url = `https://graph.microsoft.com/v1.0/me/calendar/events`;
      
      console.log("Запит до календаря...");
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Отримано дані:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Помилка отримання календаря:", error.response?.data || error.message);
      throw new Error("Не вдалося отримати календар. Деталі у логах.");
    }
  }
  
export async function getUserGrades(env: any): Promise<any> {
  
}