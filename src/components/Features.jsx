import { CheckBadgeIcon, CloudIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Daily forecast for your town',
    description: 'Get a personalized weather update for your exact location, sent at the time you choose. Start each day knowing exactly what to expect.',
    icon: CloudIcon,
  },
  {
    name: 'No app required',
    description: 'Skip the installs and notifications. Skybrief delivers your forecast straight to your inbox. Simple, fast, and accessible anywhere.',
    icon: EnvelopeIcon,
  },
  {
    name: '100% free',
    description: 'No subscriptions or hidden costs. Just reliable daily weather updates delivered to you every day.',
    icon: CheckBadgeIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-8 mb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Sky Brief sends an hour-by-hour weather forecast to your inbox every day.
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Simply select your town and the time of day you'd like to receive the forecast. Then wait for the forecasts to arrive.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-20 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-yellow-400">
                      <feature.icon aria-hidden="true" className="size-6 text-black" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
