import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Recovery from "../pages/Recovery";
import Root from "../pages/Root";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Recovery" component={Recovery} />
        </Stack.Navigator>
    );
    }
