import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-background-100">
      <div className="flex flex-col items-center justify-center">
        <h1>Typography</h1>
        <div className="flex gap-16 justify-center items-center">
          <section className="flex flex-col items-center justify-center">
            <h2>Title</h2>
            <p className="text-title-1">title1</p>
            <p className="text-title-2">title2</p>
            <p className="text-title-3">title3</p>
            <p className="text-title-4">title4</p>
            <p className="text-title-5">title5</p>
          </section>
          <section className="flex flex-col items-center justify-center">
            <h2>Body</h2>
            <p className="text-body-1">body1</p>
            <p className="text-title-2">body2</p>
            <p className="text-title-3">body3</p>
            <p className="text-body-4">body4</p>
            <p className="text-body-5">body5</p>
          </section>
          <section className="flex flex-col items-center justify-center">
            <h2>Caption</h2>
            <p className="text-caption-1">caption1</p>
            <p className="text-caption-2">caption2</p>
            <p className="text-caption-3">caption3</p>
            <p className="text-caption-4">caption4</p>
            <p className="text-caption-5">caption5</p>
          </section>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-background-100">
        <h1>Colors</h1>
        <div className="flex gap-16 justify-center items-center">
          <section className="flex flex-col items-center justify-center">
            <h2>Primary</h2>
            <p className="bg-primary-100">primary100</p>
            <p className="bg-primary-200">primary200</p>
            <p className="bg-primary-300">primary300</p>
            <p className="bg-primary-400">primary400</p>
            <p className="bg-primary-500">primary500</p>
            <p className="bg-primary-600">primary600</p>
            <p className="bg-primary-700">primary700</p>
            <p className="bg-primary-800">primary800</p>
            <p className="bg-primary-900">primary900</p>
          </section>

          <section className="flex flex-col items-center justify-center">
            <h2>Secondary</h2>
            <p className="bg-secondary-100">secondary100</p>
            <p className="bg-secondary-200">secondary200</p>
            <p className="bg-secondary-300">secondary300</p>
            <p className="bg-secondary-400">secondary400</p>
            <p className="bg-secondary-500">secondary500</p>
            <p className="bg-secondary-600">secondary600</p>
            <p className="bg-secondary-700">secondary700</p>
            <p className="bg-secondary-800">secondary800</p>
            <p className="bg-secondary-900">secondary900</p>
          </section>

          <section className="flex flex-col items-center justify-center">
            <h2>Contents</h2>
            <p className="bg-contents-100">contents100</p>
            <p className="bg-contents-200">contents200</p>
            <p className="bg-contents-300">contents300</p>
            <p className="bg-contents-400">contents400</p>
            <p className="bg-contents-500">contents500</p>
            <p className="bg-contents-600">contents600</p>
            <p className="bg-contents-700">contents700</p>
            <p className="bg-contents-800">contents800</p>
            <p className="bg-contents-900">contents900</p>
          </section>

          <section className="flex flex-col items-center justify-center">
            <h2>Background</h2>
            <p className="bg-bg-100">bg100</p>
            <p className="bg-bg-200">bg200</p>
            <p className="bg-bg-300">bg300</p>
            <p className="bg-bg-400">bg400</p>
            <p className="bg-bg-500">bg500</p>
            <p className="bg-bg-600">bg600</p>
            <p className="bg-bg-700">bg700</p>
            <p className="bg-bg-800">bg800</p>
            <p className="bg-bg-900">bg900</p>
          </section>
        </div>
      </div>
    </div>
  );
}
