// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import React, { useState, useEffect } from "react";
// import { firebase } from "./config";

// import Welcome from "./src/screens/Welcome";
// import Login from "./src/screens/Login";
// import Registation from "./src/screens/Registration";
// import Dashboard from "./src/screens/Dashboard";
// import Header from "./src/components/Header";

// const Stack = createStackNavigator();

// function App() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   if (initializing) return null;

  

//   if (!user) {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//         name="Welcome"
//         component={Welcome}
//         options={{ headerShown: false }}
//       />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{
//             headerTitle: () => <Header name="DishDelight" />,
//             headerStyle: {
//               height: 150,
//               borderBottomLeftRadius: 50,
//               borderBottomRightRadius: 50,
//               backgroundColor: "#00e4d0",
//               shadowColor: "#000",
//               elevation: 25,
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Registration"
//           component={Registation}
//           options={{
//             headerTitle: () => <Header name="DishDelight" />,
//             headerStyle: {
//               height: 150,
//               borderBottomLeftRadius: 50,
//               borderBottomRightRadius: 50,
//               backgroundColor: "#00e4d0",
//               shadowColor: "#000",
//               elevation: 25,
//             },
//           }}
//         />
//       </Stack.Navigator>
//     );
//   }

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{
//           headerTitle: () => <Header name="Dashboard" />,
//           headerStyle: {
//             height: 150,
//             borderBottomLeftRadius: 50,
//             borderBottomRightRadius: 50,
//             backgroundColor: "#00e4d0",
//             shadowColor: "#000",
//             elevation: 25,
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default () => {
//   return (
//     <NavigationContainer>
//       <App />
//     </NavigationContainer>
//   );
// };

//.................................................//

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Registation from "./src/screens/Registration";
import Dashboard from "./src/screens/Dashboard";
import Header from "./src/components/Header";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <Header name="DishDelight" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: "#00e4d0",
                  shadowColor: "#000",
                  elevation: 25,
                },
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registation}
              options={{
                headerTitle: () => <Header name="DishDelight" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: "#00e4d0",
                  shadowColor: "#000",
                  elevation: 25,
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => <Header name="Dashboard" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: "#00e4d0",
                shadowColor: "#000",
                elevation: 25,
              },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
