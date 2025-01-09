import styles from "./HelloWorld.module.css";

export function HelloWorld() {
  return (
    <div>
      <h1 className={styles.hello}>Hello World!!</h1>
    </div>
  );
}
