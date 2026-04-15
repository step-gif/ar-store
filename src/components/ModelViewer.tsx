"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
const ModelViewerTag = "model-viewer" as any;
// TypeScript-ին սովորեցնում ենք model-viewer տեգը
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

// Մեր ամբողջական ապրանքների բազան
const products = [
  {
    id: 1,
    title: "Ժամանակակից Բազմոց",
    price: "450,000 ֏",
    description: "Պրեմիում դասի փափուկ կահույք՝ ստեղծված մինիմալիստական և սկանդինավյան ինտերիերի համար։ Բարձրորակ գործվածքը ապահովում է երկարակեցություն:",
    dimensions: "Երկ. 220սմ x Լայն. 90սմ x Բարձր. 85սմ",
    thumbColor: "#e5e7eb",
    colors: [
      { id: 'c1', name: "Բաց Մոխրագույն", hex: "#d1d5db", glb: "/furniture.glb", usdz: "/furniture.usdz" },
      { id: 'c2', name: "Անտրացիտ (Մուգ)", hex: "#374151", glb: "/furniture.glb", usdz: "/furniture.usdz" },
      { id: 'c3', name: "Տերակոտա", hex: "#c2410c", glb: "/furniture.glb", usdz: "/furniture.usdz" }
    ]
  },
  {
    id: 2,
    title: "Մինիմալիստական Աթոռ",
    price: "85,000 ֏",
    description: "Էրգոնոմիկ դիզայնով աթոռ, որը իդեալական է թե՛ ճաշասենյակի, թե՛ աշխատանքային սեղանի համար: Պատրաստված է բնական փայտից:",
    dimensions: "Երկ. 50սմ x Լայն. 55սմ x Բարձր. 80սմ",
    thumbColor: "#d1d5db",
    colors: [
      { id: 'c4', name: "Բնական Կաղնի", hex: "#d4b895", glb: "/furniture.glb", usdz: "/furniture.usdz" },
      { id: 'c5', name: "Սև Փայտ", hex: "#1f2937", glb: "/furniture.glb", usdz: "/furniture.usdz" }
    ]
  },
  {
    id: 3,
    title: "Սուրճի Սեղան",
    price: "120,000 ֏",
    description: "Նրբագեղ սուրճի սեղան՝ մետաղական կառուցվածքով և կոփված ապակուց մակերեսով: Իդեալական լրացում ցանկացած հյուրասենյակի համար:",
    dimensions: "Տրամագիծ՝ 80սմ, Բարձր. 45սմ",
    thumbColor: "#f3f4f6",
    colors: [
      { id: 'c6', name: "Սպիտակ Մարմար", hex: "#f8fafc", glb: "/furniture.glb", usdz: "/furniture.usdz" },
      { id: 'c7', name: "Սև Մարմար", hex: "#0f172a", glb: "/furniture.glb", usdz: "/furniture.usdz" }
    ]
  }
];

export default function ModelViewer() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [activeColor, setActiveColor] = useState(products[0].colors[0]);

  useEffect(() => {
    setActiveColor(activeProduct.colors[0]);
  }, [activeProduct]);

  useEffect(() => {
    import("@google/model-viewer");
    setIsMounted(true);
    setCurrentUrl(window.location.href);

    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsDesktop(!mobileCheck);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto bg-white p-4 md:p-8 rounded-3xl shadow-sm">
      
      {/* ՁԱԽ ԲԱԺԻՆ - 3D Դիտարկիչ */}
      <div className="w-full lg:w-[60%] flex flex-col gap-6">
        <div className="w-full h-[50vh] md:h-[500px] bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-100 relative">
  {/* @ts-ignore */}
  <ModelViewerTag
    key={activeColor.id}
    src={activeColor.glb}
    ios-src={activeColor.usdz}
// ... մնացած կոդը շարունակվում է
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="neutral"
            shadow-intensity="1"
            style={{ width: "100%", height: "100%", backgroundColor: "#f8f9fa" }}
          >
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-8 py-3 rounded-full font-medium tracking-wide shadow-lg border border-white/20 hover:bg-black transition-all active:scale-95 whitespace-nowrap"
            >
              ԴԻՏԵԼ ՍԵՆՅԱԿՈՒՄ (AR)
            </button>
          </ModelViewerTag>
        </div>

        {/* Պատկերասրահ */}
        <div className="w-full">
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {products.map((product) => (
              <div 
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  activeProduct.id === product.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <div 
                  className={`w-24 h-24 rounded-xl mb-2 border-2 transition-all ${
                    activeProduct.id === product.id ? 'border-gray-900 scale-105 shadow-sm' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: product.thumbColor }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ԱՋ ԲԱԺԻՆ - Ինտերֆեյս */}
      <div className="w-full lg:w-[40%] flex flex-col justify-start pt-2">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-3">
            {activeProduct.title}
          </h1>
          <p className="text-2xl font-light text-gray-600">
            {activeProduct.price}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Գույն / Նյութ
            </span>
            <span className="text-sm text-gray-800 font-medium">
              {activeColor.name}
            </span>
          </div>
          <div className="flex gap-3">
            {activeProduct.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                  activeColor.id === color.id 
                    ? 'border-gray-900 scale-110 shadow-md p-1' 
                    : 'border-gray-200 hover:scale-105'
                }`}
              >
                <div 
                  className="w-full h-full rounded-full border border-gray-100"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {activeProduct.description}
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">
              Չափսերը
            </span>
            <span className="text-sm font-medium text-gray-800">
              {activeProduct.dimensions}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-10 mt-auto">
          <button className="w-full bg-black text-white py-4 rounded-xl font-medium tracking-wide hover:bg-gray-800 transition-colors shadow-md active:scale-[0.98]">
            ԱՎԵԼԱՑՆԵԼ ԶԱՄԲՅՈՒՂ
          </button>
          <button className="w-full bg-white text-black border border-gray-300 py-4 rounded-xl font-medium tracking-wide hover:bg-gray-50 transition-colors active:scale-[0.98]">
            ՊԱՏՎԻՐԵԼ ՀԵՌԱՀԱՐ ՉԱՓԱԳՐՈՒՄ
          </button>
        </div>

        {isDesktop && (
          <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <QRCode value={currentUrl} size={80} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Փորձեք տանը AR-ով</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                Սկանավորեք կոդը ձեր հեռախոսով՝ այս մոդելը իրական չափերով տեսնելու համար:
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}