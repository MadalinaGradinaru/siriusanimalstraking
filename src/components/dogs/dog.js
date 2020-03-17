import React from 'react';
import placeholder_dog from '../../media/placeholder_dog.png';

const Dog = (props) => {
    let dogItem = [];

    let image = props.item.image ? props.item.image : placeholder_dog;

    Object.keys(props.item)
          .map((key, i) => {
              dogItem = <div key={key + '_' + i}>
                  <p className={props.item.status + " name"}>{props.item.name}</p>
                  <p className="status">{props.item.status}</p>
                  {
                      (props.item.status === "other") &&
                      (<p className="status">{props.item.comments}</p>)
                  }
                  <div className="image">
                      <img src={image} alt=""/>
                  </div>
              </div>
    });

    return (
        <div className="dog-item">
            {dogItem}
            <button className="edit"
                    onClick={() => props.openEditDogModal(props.item.id, 'edit')}>Edit</button>
            <input style={{display : props.item.status === "reserved" ? 'block': "none"}}
                   type="checkbox"
                   onClick={(e)=>props.selectDog(props.item, e)}/>
        </div>
    )
};

export default Dog;
