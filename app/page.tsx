import ModelViewer from "@/src/components/ModelViewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light mb-2 tracking-wide text-gray-800">
          Վիրտուալ Ցուցասրահ
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Ժամանակակից ինտերիերի դետալներ և հեռահար ընտրություն
        </p>

        {/* Այստեղ կանչում ենք մեր ստեղծած 3D Դիտարկիչը */}
        <ModelViewer />
      </div>
    </main>
  );
}