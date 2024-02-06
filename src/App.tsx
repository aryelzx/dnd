import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import { inicialColumns } from './mock/initialData';
function App() {

 const onDragEnd = (result) => {
    // the only one that is required
    const { destination, source, draggableId } = result;
  
    if (!destination) {
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // More logic here to handle the result of the drag and drop
  }

  return (
    <div>
      <p>trello clone</p>
      <DragDropContext onDragEnd={onDragEnd}>
        {inicialColumns.map((col) => (
          <Droppable
            key={col.id}
            droppableId={col.id.toString()}
          >
            {(provided) => (
              <div
              {...provided.droppableProps}
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
                    <Draggable draggableId={item.id} index={i}>
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
                            ...provided.draggableProps.style
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
