import { useEffect, useRef, useState } from 'react';

function App() {
  const MAX_ALTERNATIVES = 3;
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [isVictory, setIsVictory] = useState(false);
  const generateColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
  const randomNumber = () => Math.floor(Math.random() * (MAX_ALTERNATIVES))
  const colorPanel = useRef<HTMLDivElement>(null);

  const declareRandomColors = (MAX_ALTERNATIVES: number = 3) => {
    setCurrentColors([])
    for(let i = 0; i < MAX_ALTERNATIVES; i++){
      setCurrentColors(currentColors => [...currentColors, generateColor()])
    }
  }
  
  function testAnswer(e: any){
    if(e.target.innerText !== colorPanel.current?.dataset.color){
      e.target.classList.add('bg-red-500')
      return;
    }

    setIsVictory(true);
    setTimeout(() => {
      correctAnswer();
    }, 1000)
    e.target.classList.add('bg-green-500')
  }

  function correctAnswer(){
    declareRandomColors();
    setIsVictory(false);
  }
  
  useEffect(() => {
    if(currentColors.length == 0){
      declareRandomColors();
    }
  }, [])
  
  useEffect(() => {
    setSelectedColor(currentColors[randomNumber()])
    console.log(selectedColor)
  }, currentColors)


  return (
    <main className="w-screen h-screen bg-neutral-50 flex justify-center items-center">
      <section className="bg-white p-5 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center text-center">
          <div className="text-2xl font-bold">{isVictory ? 'Parabéns!!!' : 'Escolha a cor correta'}</div>
          <span className="h-72 w-96 my-4" ref={colorPanel} style={{backgroundColor: selectedColor}} data-color={selectedColor}></span>
          <div className="flex-1 py-4">
            <div className="flex flex-row justify-between space-x-5">
              { currentColors.map((item) => 
                <button
                  key={item}
                  className="py-2 px-4 shadow-md rounded-lg border border-gray-300 font-semibold bg-stone-100 transition-colors hover:bg-gray-200"
                  onClick={(e) => testAnswer(e)}
                >
                  {item}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
