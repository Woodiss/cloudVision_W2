import UploadForm from "@/components/UploadForm";
export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-blue-900 flex flex-col items-center justify-center  text-center p-4">
      {/* <h1>Cloud Vision Web 2</h1>
      <p className="max-w-xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nihil perspiciatis eligendi ipsa officia facilis quidem nostrum.</p> */}
      <div className="flex flex-col items-center gap-4 max-w-md w-full">
       <UploadForm /> 
      </div>
    </div>
  )
}
