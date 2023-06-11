import TodoItem from "../../components/TodoItem";
import Kreact from "../../core/Kreact"
import styles from './index.module.css'

export default function TodoList() {
  const [list, setList] = Kreact.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target[0].value;

    if (value === '') {
      alert('할 일을 입력해주세요');
      return;
    }

    setList(prev =>
      [...prev, { id: prev.length, todo: value, idDone: false }]
    )

    e.target[0].value = '';
  };

  const handleCheckClick = (id) => {
    setList(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, idDone: !item.idDone }
          : item
      )
    );
  };

  const handleDeleteClick = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    setList(prev => {
      return prev.filter(item => item.id !== id)
    })
  }


  return (
    <div className={styles.todolist}>
      <h1 className={styles.todolist__title}>할 일을 적어보아요</h1>
      <form className={styles.todolist__form} onSubmit={handleSubmit}>
        <input type="text" placeholder="할 일을 적으세요" className={styles.todolist__form__input} />
        <button className={styles.todolist__form__add}>추가</button>
      </form>
      <ul className={styles.todolist__list}>
        {
          list.map((item, index) =>
            <TodoItem key={index} item={item} onCheckclick={handleCheckClick} onDeleteClick={handleDeleteClick} />
          )
        }
      </ul>
    </div>
  )
}