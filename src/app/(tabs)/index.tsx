import { getMeals, Meal } from "@/storage/meals";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";
import HomeHeader from "../components/HomeHeader";
import MacroGrid from "../components/MacroGrid";
import RecentMeals from "../components/RecentMeals";
import { globalStyles } from "../styles/global";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log("Loaded Meals:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid meals={meals} />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
