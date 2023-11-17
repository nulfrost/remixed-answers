import { Link, Form, MetaFunction, useLoaderData } from '@remix-run/react'
import { getAllQuestions } from './getAllQuestions'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { formatDistanceToNow } from 'date-fns'

export const meta: MetaFunction = () => {
   return [
      { title: 'Remixed Answers | Search through thousands of questions' },
      {
         property: 'og:title',
         content: 'Remixed Answers | Search through thousands of questions',
      },
      {
         property: 'og:description',
         content: 'Start a conversation or find questions to answer',
      },
      {
         name: 'description',
         content: 'Start a conversation or find questions to answer',
      },
   ]
}

export async function loader({ request }: LoaderFunctionArgs) {
   const urlParams = new URL(request.url)
   const searchTerm = urlParams.searchParams.get('q') || ''
   const questions = await getAllQuestions(searchTerm)
   return json({ questions })
}

export default function Index() {
   const { questions } = useLoaderData<typeof loader>()
   return (
      <div>
         <h1 className="font-bold text-3xl mb-2">Search</h1>
         <Form className="w-full flex gap-2 mb-4">
            <label htmlFor="search" className="sr-only">
               Search remixed answers
            </label>
            <input
               type="search"
               name="q"
               autoFocus
               id="search"
               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
               placeholder="Search Remixed Answers"
            />
            <button
               type="submit"
               className="shadow-sm bg-indigo-500 text-white px-4 rounded-md font-semibold hover:bg-indigo-600 duration-150 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 outline-none"
            >
               Search
            </button>
         </Form>
         {questions.length === 0 ? (
            <EmptyState />
         ) : (
            <div className="[&>*]:border [&>*]:border-b-0">
               {questions.map((question) => (
                  <Question {...question} key={question.id} />
               ))}
            </div>
         )}
      </div>
   )
}

function EmptyState() {
   return (
      <div className="w-full bg-gray-100 rounded-sm h-20 border-dashed border-gray-400 border-2 flex justify-center items-center">
         <p className="text-gray-600">
            No one has asked a question yet,{' '}
            <Link
               to="/questions/new"
               className="font-bold text-indigo-700 hover:underline"
            >
               start the conversation
            </Link>
         </p>
      </div>
   )
}

interface QuestionProps {
   id: number
   title: string
   body: string
   created_at: string | null
   category: {
      name: string | null
   }
}

function Question(props: QuestionProps) {
   return (
      <div className="border-gray-200 p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md bg-white">
         <header>
            <h2 className="font-bold mb-2 text-lg">
               <Link to={`/questions/${props.id}`} className="hover:underline">
                  {props.title}
               </Link>
            </h2>
         </header>
         {props.body ? (
            <p className="text-gray-500 mb-2 text-sm">{props.body}</p>
         ) : null}
         <footer className="text-xs text-gray-500">
            <span>5 comments</span> &middot;{' '}
            <Link
               to="#"
               className="text-blue-500 hover:underline hover:text-blue-600 duration-150"
            >
               {props.category.name}
            </Link>{' '}
            &middot;{' '}
            <time dateTime={props.created_at?.toString()}>
               {formatDistanceToNow(new Date(props.created_at as string), {
                  addSuffix: true,
               })}
            </time>
         </footer>
      </div>
   )
}
