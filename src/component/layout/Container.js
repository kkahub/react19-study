import { useEffect } from 'react';

function Card({ isShow }) {
  const show = isShow;
  const listItems = <li>test 00</li>;
  const listItem = <li>test 03</li>;

  if (!show) {
    return null;
  }

  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>Card Description</p>
      <ul>
        {listItems}
        {listItem}
      </ul>
    </div>
  );
}

export default function Container() {
  return (
    <div id="container">
      <a
        className="github"
        href="https://github.com/kkahub/react19-study?tab=readme-ov-file"
        target="_blank"
      >
        github링크 ⨠
      </a>
      <h2>Keeping Components Pure</h2>
      <details>
        <summary>StrickMode</summary>
        <div class="desc_wrap">
          <ul>
            <li>component를 순수하게 유지해야 함</li>
            <li>props, state, context는 항상 읽기전용으로 처리해야 함</li>
            <li>이벤트 핸들러 내부, useEffect의 경우 순수할 필요 없음, 계산 가능</li>
            <li>
              component를 두 번 호출하는 "StrickMode"로 규칙을 어기는 구성 요소를 찾음
              <div class="code">
                <xmp>
                  <span className="gry">// index.js</span>
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
        <div class="desc_wrap">
          <ul>
            <li>use가 붙는 함수 Hooks는 렌더링하는 동안만 사용</li>
            <li>
              Hooks는 최상위 수준(Top level)에서만 호출
              <br />이 규칙을 지킬 경우 항상 안전하게 동일한 순서로 호출
            </li>
          </ul>
        </div>
      </details>

      <h2>State as a Snapshot</h2>
      <details>
        <summary>Snapshot처럼 작동하는 state</summary>
        <div class="desc_wrap">
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
        <div class="desc_wrap">
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
    </div>
  );
}
