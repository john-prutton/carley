import mockupAnalyzeBrownRice from "@/../public/img/mockups/analyze-brown-rice.png"
import mockupAnalyzeToastedSandwich from "@/../public/img/mockups/analyze-toasted-sandwich.png"
import mockupMealHistoryDetailed from "@/../public/img/mockups/meal-history-detailed.png"
import mockupMealHistoryZoomed from "@/../public/img/mockups/meal-history-zoomed.png"

import { Feature } from "./feature"
import { FeatureWithMockup } from "./feature-with-mockup"
import { Hero } from "./hero"

export default function Home() {
  return (
    <main className="pb-32">
      <Hero />

      <div className="mx-auto max-w-5xl space-y-32 px-8">
        <section>
          <h2 className="mb-8 translate-x-4 text-2xl font-bold">
            ✨ v0.1.0 Features
          </h2>

          <div className="space-y-16">
            <FeatureWithMockup
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

            <FeatureWithMockup
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

        <section>
          <h2 className="mb-8 translate-x-4 text-2xl font-bold">🚧 Roadmap</h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Feature
              icon="🤑"
              title="Paid Plans"
              description="Paid plans with increased usage limits. Don't worry, the free plan will always include features."
            />

            <Feature
              icon="🤖"
              title="AI Improvements"
              description="Continued improvements to Carley's AI."
            />
            <Feature
              icon="✏️"
              title="Editable Meal Entries"
              description="Edit meal entries after they've been added, either by hand or with the help of AI."
            />
            <Feature
              icon="🎯"
              title="Daily Targets"
              description="Set daily nutrition targets and track your progress toward them."
            />
          </div>
        </section>
      </div>
    </main>
  )
}
