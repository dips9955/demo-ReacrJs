type CounterPageProps = {
  count: number
  setCount: (update: (currentCount: number) => number) => void
}

export function CounterPage({ count, setCount }: CounterPageProps) {
  return (
    <section className="panel tool-panel">
      <div className="tool-intro">
        <span className="large-tool-icon lavender">↗</span>
        <div><h2>Counter</h2><p>Keep count of whatever you like.</p></div>
      </div>
      <div className="counter-display" aria-live="polite">{count}</div>
      <div className="counter-actions">
        <button
          type="button"
          className="button-secondary"
          onClick={() => setCount((value) => value - 1)}
          aria-label="Decrease counter"
        >−</button>
        <button type="button" className="button-primary" onClick={() => setCount((value) => value + 1)}>
          Add one <span aria-hidden="true">+</span>
        </button>
        <button type="button" className="button-secondary" onClick={() => setCount(() => 0)}>
          Reset
        </button>
      </div>
    </section>
  )
}
