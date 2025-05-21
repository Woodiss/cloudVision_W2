import UploadForm from "@/components/UploadForm";
export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center  text-center p-4">
      <h1 className="text-6xl mb-4">Recycle recipe ♻️</h1>
      <p>Upload an image of your ingredients and let the magic happend !</p>
      {/* <h1>Cloud Vision Web 2</h1>
      <p className="max-w-xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil perspiciatis eligendi ipsa officia facilis quidem nostrum.</p> */}
      <div className="flex flex-col items-center gap-4 max-w-md w-full mt-6">
       <UploadForm /> 
      </div>
    </div>
  )
}
