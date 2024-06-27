import mockupAnalyzeBrownRice from "@/../public/img/mockups/analyze-brown-rice.png"
import mockupAnalyzeToastedSandwich from "@/../public/img/mockups/analyze-toasted-sandwich.png"
import mockupMealHistoryDetailed from "@/../public/img/mockups/meal-history-detailed.png"
import mockupMealHistoryZoomed from "@/../public/img/mockups/meal-history-zoomed.png"

import { Feature } from "./feature"
import { Hero } from "./hero"

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-5xl px-8">
        <section>
          <h2 className="mb-8 translate-x-4 text-2xl font-bold">
            ✨ v0.1.0 Features
          </h2>

          <div className="space-y-16">
            <Feature
              features={[
                {
                  icon: "📸",
                  title: "Analyze a Photograph",
                  description:
                    "Simply snap a photo of your meal, and Carley will analyze the image to extract detailed nutritional information, including calories, protein, carbs, and fat."
                },
                {
                  icon: "📝",
                  title: "Add Notes",
                  description:
                    "Add optional text describing your meal to increase Carley's response accuracy. You could include ingredients that aren't visible, or say whether you shared or finished the meal."
                }
              ]}
              mockups={[mockupAnalyzeBrownRice, mockupAnalyzeToastedSandwich]}
            />

            <Feature
              features={[
                {
                  icon: "📈",
                  title: "Visualize Your Progress",
                  description:
                    "Get a comprehensive view of your nutrition over time with interactive charts that display your daily totals."
                },
                {
                  icon: "🗄️",
                  title: "Cloud Storage",
                  description:
                    "All your data is securely stored in the cloud, so you can access it from any device."
                }
              ]}
              mockups={[mockupMealHistoryZoomed, mockupMealHistoryDetailed]}
            />
          </div>
        </section>
      </div>
    </main>
  )
}
