import ClipLoader from "react-spinners/ClipLoader";

function LoadingIcon() {
  return (
    <div className="w-full flex justify-center py-3">
        <ClipLoader color='#1d9bf0' size={30} loading={true} />
    </div>
  )
}

export default LoadingIcon