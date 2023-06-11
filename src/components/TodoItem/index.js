import Kreact from "../../core/Kreact"
import styles from './index.module.css'

export default function TodoItem({ item, onCheckclick, onDeleteClick }) {
  return (
    <li className={styles.item}>
      <div style={{ display: 'flex' }}>
        {/* attribute에서 분기 처리 안됨 */}
        {
          item.idDone ?
            <>
              <input type="checkbox" onClick={() => onCheckclick(item.id)} checked />
              <p className={styles.item__text__done}>{item.todo}</p>
            </>
            :
            <>
              <input type="checkbox" onClick={() => onCheckclick(item.id)} />
              <p className={styles.item__text}>{item.todo}</p>
            </>
        }
      </div>
      <button className={styles.button__delete} onClick={() => onDeleteClick(item.id)}>삭제</button>
    </li>
  )
}