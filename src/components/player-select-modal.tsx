import { useState } from "react"

export const PlayerSelectModal = ({
  show,
  text,
  showDeadPick,
  showModal,
  onModalConfirm,
}: {
  show: boolean
  text?: string 
  showModal: (value: boolean) => void
  showDeadPick: boolean
  onModalConfirm: (deadpick: boolean) => void
}) => {
   const [isChecked, setIsChecked] = useState(false);

  // Step 3: Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCancelClick = () => {
    showModal(false)
  }

  const handleConfirmClick = () => {
    showModal(false)
    onModalConfirm(isChecked)
  }
  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-400 bg-opacity-70 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-700 shadow-lg outline-none focus:outline-none">
                {/*body*/}
                <div className="relative flex-auto p-12">
                  <p className="my-4 text-lg font-bold leading-relaxed text-white">
                    {text || 'Do you want to select this player?'}
                  </p>
                  {showDeadPick ? 
                  <div className="flex items-center justify-center mb-4">
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onClick={handleCheckboxChange}/>
                      <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ml-2">Is this a dead pick?</label>
                  </div>
                  : <></>}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="bg-red-600 mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => handleCancelClick()}
                  >
                    Close
                  </button>
                  <button
                    className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => handleConfirmClick()}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}
