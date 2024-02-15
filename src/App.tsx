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

  const [draggedItem, setDraggedItem] = useState({} as DraggItems)
  const [columns, setColumns] = useState(inicialColumns)    


  const onDragEnd = (result: DropResult) => {
    console.log(result)
    // the only one that is required
    const { destination, source, draggableId } = result

    //se não mover
    if (!destination) return;
    
    if (destination) {
      const sourceColumnItems = columns[0].items
      
      for (const i in sourceColumnItems) {
        if (sourceColumnItems[i].id === result.draggableId) {
          setDraggedItem(sourceColumnItems[i])
        }
      }

      //remove drag object
      const filteredColumns = sourceColumnItems.filter(
        (i) => i.id !== result.draggableId
      )
        console.log('filteredColumns', filteredColumns)

      //adding in new position
      filteredColumns.splice(destination.index, 0, draggedItem)
      //update state
      setColumns([{ ...columns[0], items: filteredColumns }])
      
      console.log('draggedItem', draggedItem)

    }

    //More logic here to handle the result of the drag and drop
  }

  return (
    <div>
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
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
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
