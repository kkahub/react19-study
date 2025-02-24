export default function Container() {
  return (
    <div id="container">
      <a
        className="github"
        href="https://github.com/kkahub/react19-study?tab=readme-ov-file"
        target="_blank"
        rel="noreferrer"
      >
        github링크 ⨠
      </a>
      <h2>Keeping Components Pure</h2>
      <details>
        <summary>StrickMode</summary>
        <div className="desc_wrap">
          <ul>
            <li>component를 순수하게 유지해야 함</li>
            <li>props, state, context는 항상 읽기전용으로 처리해야 함</li>
            <li>이벤트 핸들러 내부, useEffect의 경우 순수할 필요 없음, 계산 가능</li>
            <li>
              component를 두 번 호출하는 "StrickMode"로 규칙을 어기는 구성 요소를 찾음
              <div className="code">
                <xmp>
                  <span className="gry">{'//'} index.js</span>
                  {`\n`}
                  {`<React.StrictMode> 
  <App />
</React.StrictMode>`}
                </xmp>
              </div>
            </li>
            <li>production 모드에서는 효과 없어서 앱 속도 문제 없음</li>
          </ul>
        </div>
      </details>

      <h2>State: A Component's Memory</h2>
      <details>
        <summary>Hooks</summary>
        <div className="desc_wrap">
          <ul>
            <li>use가 붙는 함수 Hooks는 렌더링하는 동안만 사용</li>
            <li>
              Hooks는 최상위 수준(Top level)에서만 호출
              <br />이 규칙을 지킬 경우 항상 안전하게 동일한 순서로 호출 됨
            </li>
          </ul>
        </div>
      </details>

      <h2>State as a Snapshot</h2>
      <details>
        <summary>Snapshot처럼 작동하는 state</summary>
        <div className="desc_wrap">
          <ul>
            <li>
              아래 코드를 작동하면 +3이 될 것 같지만 +1만 된다.
              <div className="code">
                <xmp>
                  {` <button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>`}
                </xmp>
              </div>
            </li>
            <li>
              '다음 렌더링에서 state값 0에 +1을 준비한다.'를 세 번 갈아끼우며 대체해서 마지막
              setNumber만 준비함.
              <br />
              준비과정 코드를 시각화한 모습
              <div className="code">
                <xmp>
                  {` <button
  onClick={() => {
    setNumber(0 + 1);
    setNumber(0 + 1);
    setNumber(0 + 1);
  }}
>
  +3
</button>`}
                </xmp>
              </div>
            </li>
            <li>
              이런 snapshot 처럼 작동하는 state는 이벤트 핸들러 안에서 setTimeout을 사용해
              인위적으로 이벤트를 지연시키고 그 사이 상태값을 바꿔도 값이 고정되 바뀌지 않는다.
            </li>
          </ul>
        </div>
      </details>

      <h2>Queueing a Series of State Updates</h2>
      <details>
        <summary>state의 렌더링 전에 여러번 업데이트</summary>
        <div className="desc_wrap">
          <ul>
            <li>
              함수는 업데이터 함수로 여기고 다음 큐에 추가하고 추가하며 최종 업데이트된 상태를 다음
              렌더링에서 제공
              <div className="code">
                <xmp>
                  {` <button
  onClick={() => {
    setNumber(n => n + 1);
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  }}
>
  +3
</button>`}
                </xmp>
              </div>
            </li>
          </ul>
        </div>
      </details>

      <h2>Updating Arrays in State</h2>
      <details>
        <summary>state의 변형 방지</summary>
        <div className="desc_wrap">
          <ul>
            <li>배열을 변형하지 말고 새로운 배열을 반환하는 방법을 사용해야함</li>
            <li>
              <strong>❌ 사용금지방법</strong>
              <div className="tip">
                push, unshift, splice, pop, shift, sort, reverse, arr[i] = ...
              </div>
            </li>
            <li>
              <strong>✔️ 사용권장방법</strong>
              <div className="tip">[...arr], concat, slice, filter, map, copy array</div>
            </li>
          </ul>
        </div>
      </details>

      <h2>Choosing the State Structure</h2>
      <details>
        <summary>state 원칙</summary>
        <div className="desc_wrap">
          <ol>
            <li>state는 최대한 단순하게 유지</li>
            <li>마우스의 x, y 값과 같이 동시에 변경될 경우 객체로 묶어 관리</li>
            <li>
              state끼리 모순되지 않는지 검토 필요
              <div className="tip">
                form을 보낼 때 state isSending, isSent가 모두 true일 수 없음
                <br />→ status변수로 정하고 값을 sending, sent로 변경하며 관리하는 방식이 좋음
              </div>
            </li>
            <li>
              중복되지 않게 주의
              <div className="tip">
                firstName, lastName, fullName
                <br />
                fullName은 firstName + lastName으로 가능
              </div>
            </li>
            <li>내려받은 props를 다시 state로 쓰지 않기</li>
            <li>state의 state를 만들지 않기(중복, 업데이트 안됨)</li>
            <li>깊은 중첩 객체 state 만들지 않기</li>
          </ol>
        </div>
      </details>

      <h2>Preserving and Resetting State</h2>
      <details>
        <summary>state 보존과 리셋</summary>
        <div className="desc_wrap">
          <ol>
            <li>
              state는 React가 state를 각각 컴포넌트에 연결해주고 컴포넌트가 렌더링 됨.
              <br />
              <strong>UI트리 위치</strong>가 다르면 서로에게 영향을 미치지 않음
              <div className="tip">
                div → Counter / Counter UI트리 구조이며 Counter는 각자 다른 위치에서 두개가 랜더링
                됨.
                <br />
                안에 있는 state는 서로 영향을 미치지 않고 따로 카운터 됨
                <div className="code">
                  <xmp>
                    {`<div>
  <Counter />
  <Counter />
</div>`}
                  </xmp>
                </div>
              </div>
            </li>
            <li>
              리셋 : 조건문 같은 것으로 컴포넌트를 제거하면 state는 파괴되어 리셋 됨
              <div className="tip">
                isShow state로 두번째 Counter를 없애면 두번째 Counter만 리셋 됨
                <div className="code">
                  <xmp>
                    {`<div>
  <Counter />
  {isShow && <Counter />}
</div>`}
                  </xmp>
                </div>
              </div>
            </li>
            <li>
              동일한 트리 위치(구조)에 있는 컴포넌트는 유지됨
              <div className="tip">
                예시{`)`} Counter 한개를 true, false로 변경할 뿐 동일한 위치
                <div className="code">
                  <xmp>
                    {`<div>
  {isFancy ? (
    <Counter isFancy={true} /> 
  ) : (
    <Counter isFancy={false} /> 
  )}
</div>`}
                  </xmp>
                </div>
              </div>
            </li>
            <li>
              동일한 UI트리 위치에 div {`->`} section으로 변경되면서 다시 렌더링
              <div className="tip">
                예시{`)`} div, section으로 같은 위치에 다른 요소로 렌더링하면 서브트리 state가
                재설정 됨
                <div className="code">
                  <xmp>
                    {`<div>
  {isFancy ? (`}
                    <br />
                    <span className="org">{`    <div>`}</span>
                    {`
      <Counter isFancy={true} />`}
                    <br />
                    <span className="org">{`    </div>`}</span>
                    {`
  ) : (`}
                    <br />
                    <span className="org">{`    <section>`}</span>
                    {`
      <Counter isFancy={false} />`}
                    <br />
                    <span className="org">{`    </section>`}</span>
                    {`
  )}
</div>`}
                  </xmp>
                </div>
              </div>
            </li>
            <li>
              의도된 재랜더링 방법
              <div className="tip">
                예시{`)`} 다른 위치에 컴포넌트 렌더링하기
                <div className="code">
                  <xmp>
                    {`{isFancy && (
  <Counter fruit="apple" />
)}
{!isFancy && (
  <Counter fruit="banana" />
)}
`}
                  </xmp>
                </div>
                <br />
                예시{`)`} key를 각 컴포넌트에 부여하기
                <div className="code">
                  <xmp>
                    {`{isFancy && (
  <Counter key="apple" />
)}
{!isFancy && (
  <Counter key="banana" />
)}
`}
                  </xmp>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </details>
    </div>
  );
}
