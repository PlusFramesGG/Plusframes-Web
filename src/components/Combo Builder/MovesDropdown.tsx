import React, { useEffect, useState, Fragment } from 'react';
import { Move, Character, Games } from '@/shared/types';
import { fetchMovesByCharacterId } from '@/shared/utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface MovesDropdownProps {
  character: Character;
  selectedMove?: Move;
  onMoveSelect: (move: Move) => void; 
}

const MovesDropdown = ({ character, selectedMove, onMoveSelect }: MovesDropdownProps) => {
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    const updateMoves = async () => {
      const data = await fetchMovesByCharacterId(character.id, Games.SF6);

      const sortedMoves = data.sort((a: Move, b: Move) => {
        if (a.startup === null) return 1;
        if (b.startup === null) return -1;
        return a.startup - b.startup;
      });

      setMoves(sortedMoves);

      if (sortedMoves.length > 0) {
        onMoveSelect(sortedMoves[0]);
      }
    };

    if (character) {
      updateMoves();
    }
  }, [character]);

  const handleChange = (selectedMoveId: number) => {
    //const selectedMoveId = parseInt(e.target.value, 10);
    const newSelectedMove = moves.find(move => move.id === selectedMoveId);
    if (newSelectedMove) {
      onMoveSelect(newSelectedMove);
    }
  };

  return (
    <div className="flex items-start p-6 justify-start">
      <label className="mt-1 mr-2.5 font-sans text-base font-semibold leading-relaxed text-black">Starter:</label>
      <Listbox value={selectedMove?.id || ''} onChange={handleChange}>
        {({ open }) => (
          <div className="relative w-full">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate">{selectedMove?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
    
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {moves.map((move) => (
                  <Listbox.Option
                    key={move.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={move.id}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {move.name}
                          </span>
                        </div>
    
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default MovesDropdown;