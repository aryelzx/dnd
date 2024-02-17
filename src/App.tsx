import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import './App.css'
import { inicialColumns } from './mock/initialData'
function App() {
  interface DraggItems { 
    id: string
    content: string
  }

  const [columns, setColumns] = useState(inicialColumns)    

  const onDragEnd = (result: DropResult) => {
    // the only one that is required
    const { destination, source, draggableId } = result

    //se não mover
    if (!destination) return;
    //se mover para o mesmo lugar
    if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
    
    //reorder our columns
    const column = columns.find(
      (col) => col.id.toString() === source.droppableId
    )
    const items = Array.from(column!.items)
    const [removed] = items.splice(source.index, 1)
    items.splice(destination.index, 0, removed) 
    column!.items = items
    setColumns([...columns])

    console.log('columns', columns)
    console.log(items, 'items')


    // const confirm = window.confirm(
		// 	`Deseja realmente alterar o status da tarefa para ${column.name.toLocaleLowerCase()} ?`
		// );
		// if (!confirm) return

 

      //remove drag object
      // const filteredColumns = columns.filter(
      //   (i) => i.id !== result.draggableId
      // )
      //   console.log('filteredColumns', filteredColumns)

    

    //More logic here to handle the result of the drag and drop
  }

  return (
    <div className='flex'>
      <p>trello clone</p>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((col) => (
          <Droppable
            key={col.id}
            droppableId={col.id}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                key={col.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h1>{col.name}</h1>
                <div
                  key={col.id}
                  style={{
                    backgroundColor: 'lightblue',
                    width: 250,
                    height: 500,
                    padding: 15,
                  }}
                >
                  {col.items.map((item, i) => (
                    <Draggable
                      draggableId={item.id}
                      index={i}
                    >
                      {(provided) => (
                        <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={item.id}
                          style={{
                            backgroundColor: 'white',
                            height: 20,
                            marginBottom: 10,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
