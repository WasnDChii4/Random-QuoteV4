import React, { useEffect, useState } from "react";
import { RefreshCw, CopyIcon } from "lucide-react";

export default function RandomQuote() {
  const [quote, setQuote] = useState({
    content: 'Loading...',
    author: '',
  });
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      setQuote ({
        content: data.quote,
        author: data.author,
      })
      setAlert ({
        show: true,
        type: "success",
        message: "Quote berhasil dimuat!",
      });
      setTimeout(() => setAlert ({ show: false}), 2000);
    } catch(err) {
      console.error("Error loading quote:", err);
      
      setQuote ({
        content: "Failed to load quote. Please try again!",
        author: "",
      });

      setAlert ({
        show: true,
        type: "error",
        message: "Quote gagal dimuat. Coba lagi!"
      });

      setTimeout(() => setAlert ({ show: false }), 2500);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${quote.content}" — ${quote.author}`
      );

      setAlert ({
        show: true,
        type: "success",
        message: "Quote berhasil disalin ke clipboard",
      });

      setTimeout(() => setAlert({ show: false }), 2000);
    } catch(err) {
      console.error("Failed to copy:", err);

      setAlert ({
        show: true,
        type: "error",
        message: "Gagal menyalin quote ke clipboard",
      })
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      {/* {alert.show && (
        <div role="alert" className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"} fixed top-4 right-4 w-fit shadow-lg animate-fade-in-out z-10`}>
          <svg>

          </svg>
        </div>
      )} */}
      <div className="bg-[#1E1E2E]/75 place-self-center w-11/12 p-3 md:p-7 rounded-xl backdrop-blur-xs shadow-lg shadow-[#1E1E2E] border border-white/15 m-4">
        <h1 className="text-2xl md:text-5xl font-jolly-lodger-regular mb-2 md:mb-4">Random Quote</h1>
        <div className="mb-6">
          <svg className="w-6 md:w-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
          <p className="text-xl md:text-3xl leading-relaxed mb-6 ml-6">
            {quote.content}
          </p>
          {quote.author && (
            <p className="text-xs md:text-sm text-white/75 text-right">
              ~ {quote.author}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <button onClick={fetchQuote} disabled={loading}>
              <RefreshCw className={`text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div>
            <button>
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}