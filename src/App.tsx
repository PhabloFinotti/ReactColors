import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise } from 'phosphor-react';
import classNames from 'classnames';
import { pickTextColorBasedOnBgColorSimple } from './helpers/helper';

function App() {
  const MAX_ALTERNATIVES = 3;
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const colorPanel = useRef<HTMLDivElement>(null);
  const generateColor = () => {
    let randomHex = ('0' + Math.floor(Math.random()*16777215).toString(16)).slice(-6)
    return '#' + randomHex; 
  };
  const randomNumber = () => Math.floor(Math.random() * (MAX_ALTERNATIVES))

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

    console.log(e)

    e.target.classList.add('bg-green-500')
    setIsVictory(true);
  }

  function restartGame(){
    declareRandomColors();
    setIsVictory(false);
  }
  
  useEffect(() => {
    declareRandomColors();
  }, [])
  
  useEffect(() => {
    setSelectedColor(currentColors[randomNumber()])
  }, [currentColors])


  return (
    <main 
      className={ classNames("w-screen h-screen bg-gray-200 flex justify-center items-center", {
        'cursor-pointer': isVictory,
      })}
      onClick={isVictory ? () => restartGame() : undefined}
      title={isVictory ? 'Clique para Reiniciar o Jogo' : 'Tente adivinhar a cor!'}
    >
      <section className="bg-white p-5 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center text-center">
          <div className="text-2xl font-bold">{isVictory ? 'Parabéns!' : 'Escolha a cor correta'}</div>
          <span 
            className="h-72 w-96 my-4 flex justify-center items-center font-bold text-3xl" 
            ref={colorPanel} 
            style={{backgroundColor: selectedColor}} 
            data-color={selectedColor}
          >
            {isVictory ? <ArrowClockwise size={100} color={pickTextColorBasedOnBgColorSimple(selectedColor)} weight="bold" /> : ''}
          </span>
          <div className="flex-1 py-4">
            <div className="flex flex-row justify-between space-x-5">
              { currentColors.map((item) => 
                <button
                  key={item}
                  className="py-2 px-4 shadow-md rounded-lg border border-gray-300 font-semibold transition-all hover:shadow-xl"
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
