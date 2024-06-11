
export default function Itinerary(){
    return(
<div
  className="w-full bg-center h-50% bg-cover"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1554107136-57b138ea99df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
  }}
>
        <div
          className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12"
        >
          <div className="text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto text-center">                
                <h2
                  className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100"
                >
                Your Trip to San Francisco, CA 
                </h2>
                <p className="max-w-3xl mx-auto mb-5 text-lg text-gray-300">Mom's Birthday Trip to California</p>
                <p className="max-w-3xl mx-auto mb-10 text-md text-gray-300">
                  6/21 - 6/28/2024
                </p>
                <a
                  className="inline-block w-full md:w-auto mb-4 md:mr-6 py-3 px-5 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
                  href="http://localhost:8083/todos"
                  >Create a New To Do</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}