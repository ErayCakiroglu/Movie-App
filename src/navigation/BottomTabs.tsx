import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "react-native-size-matters";
import CategoriesScreen from "../screens/CategoriesScreen";
import SavedScreen from "../screens/SavedScreen";
import { TABBARCOLORS } from "../themes/colors";
import { language } from "../constants/languageConstant";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: TABBARCOLORS.background,
                borderBottomColor: TABBARCOLORS.borderColor,
                borderBottomWidth: s(1),

            },
            headerTitleStyle: {
                color: TABBARCOLORS.textColor,
                fontWeight: "bold"
            },
            tabBarStyle: {
                backgroundColor: TABBARCOLORS.background,
                borderTopColor: TABBARCOLORS.borderColor,
                borderTopWidth: s(1)
            },
            tabBarActiveTintColor: TABBARCOLORS.activeTintColor,
            tabBarInactiveTintColor: TABBARCOLORS.inActiveTintColor,
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                title: language.EN.home,
                tabBarIcon: ({ focused, color }) => {
                    return (
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} size={s(24)} color={color} />
                    )
                }
            }} />
            <Tab.Screen name="CategoriesScreen" component={CategoriesScreen} options={{
                title: language.EN.categories,
                tabBarIcon: ({ focused, color }) => {
                    return (
                        <Ionicons name={focused ? "albums-sharp" : "albums-outline"} size={s(24)} color={color} />
                    )
                }
            }} />
            <Tab.Screen name="SavedScreen" component={SavedScreen} options={{
                title: language.EN.saved,
                tabBarIcon: ({ focused, color }) => {
                    return (
                        <Ionicons name={focused ? "bookmarks-sharp" : "bookmarks-outline"} size={s(24)} color={color} />
                    )
                }
            }} />
        </Tab.Navigator>
    );
}