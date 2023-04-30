export const PlayerSelectModal = ({
  show,
  text,
  showModal,
  onModalConfirm,
}: {
  show: boolean
  text?: string 
  showModal: (value: boolean) => void
  onModalConfirm: () => void

}) => {
  const handleCancelClick = () => {
    showModal(false)
  }

  const handleConfirmClick = () => {
    showModal(false)
    onModalConfirm()
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
