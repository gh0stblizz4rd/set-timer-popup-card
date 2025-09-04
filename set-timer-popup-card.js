const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class SetTimerCard extends LitElement {
  set hass(hass) {
    this._hass = hass;
    this.entityState = this._hass.states[this.entity].state;
  }

  constructor() {
    super();
    this.hoursColumnMoveIndex = 0;
    this.minutesColumnMoveIndex = 0;
    this.secondsColumnMoveIndex = 0;
    this.hoursMaxMoveIndex = 24;
    this.minutesMaxMoveIndex = 60;
    this.secondsMaxMoveIndex = 60;
    this.timerAction = "";
  }

  static styles = css`
    .set-timer-card {
      overflow: hidden;
      height: 100%;
    }

    .container ha-card {
      border: none !important;
      padding: 12px;
    }

    .timer-input-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      border: none !important;
    }

    .timer-input-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .dimmed {
      opacity: 0.9;
    }

    .timer-setting-text {
      font-size: 17px;
    }

    .column-titles {
      display: flex;
    }

    .column-title {
      width: 90px;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .timer-columns-wrapper {
      width: fit-content;
      display: flex;
      align-items: center;
    }

    .timer-digit-column-wrapper {
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0)
      );
      z-index: 2;
    }

    .timer-digit-column {
      display: flex;
      flex-direction: column;
      height: 130px;
      font-size: 40px;
      font-family: Arial, sans-serif;
      transition: transform 100ms ease;
    }

    .timer-digit {
      text-align: center;
      min-width: 85px;
      min-height: 55px;
    }

    .digit-seperator {
      width: 4px;
      height: 130px;
      background-color: var(--primary-text-color);
    }

    .timer-action-selector {
      display: flex;
      align-items: center;
      z-index: 5;
      gap: 8px;
    }

    .timer-action {
      padding: 4px 6px;
    }

    .pointer-cursor {
      cursor: pointer;
    }

    .timer-action-active {
      color: var(--primary-background-color);
      background-color: var(--primary-text-color);
      border-radius: 17px;
    }
    .set-timer-button {
      padding: 10px 16px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      z-index: 5;
      cursor: pointer;
      font-size: 1rem;
    }
  `;
  render() {
    let actionClassList;
    if (this.entityState == "set") {
      actionClassList = "timer-action";
    } else if (this.entityState == "idle") {
      actionClassList = "timer-action pointer-cursor";
    }

    return html`
      <ha-card class="set-timer-card">
        <div class="timer-card-wrapper">
          <div class="card-content timer-input-card">
              <div class="timer-input-wrapper ${
                this.entityState == "set" ? "dimmed" : ""
              }" >
                  <span class="timer-setting-text">
                  </span>
                  <div class="column-titles">
                      <span class="column-title">Hours</span>
                      <span class="column-title">Minutes</span>
                      <span class="column-title">Seconds</span>
                  </div>
                  <div class="timer-columns-wrapper">
                      <div class="timer-digit-column-wrapper" id="hours-column" @touchstart="${
                        this._handleTouchStart
                      }" @touchmove="${this._handleTouchMove}" @wheel="${
      this._handleScroll
    }">
                          <div class="timer-digit-column">
                              <div class="timer-digit">  </div>
                              <div class="timer-digit">00</div>
                              <div class="timer-digit">01</div>
                              <div class="timer-digit">02</div>
                              <div class="timer-digit">03</div>
                              <div class="timer-digit">04</div>
                              <div class="timer-digit">05</div>
                              <div class="timer-digit">06</div>
                              <div class="timer-digit">07</div>
                              <div class="timer-digit">08</div>
                              <div class="timer-digit">09</div>
                              <div class="timer-digit">10</div>
                              <div class="timer-digit">11</div>
                              <div class="timer-digit">12</div>
                              <div class="timer-digit">13</div>
                              <div class="timer-digit">14</div>
                              <div class="timer-digit">15</div>
                              <div class="timer-digit">16</div>
                              <div class="timer-digit">17</div>
                              <div class="timer-digit">18</div>
                              <div class="timer-digit">19</div>
                              <div class="timer-digit">20</div>
                              <div class="timer-digit">21</div>
                              <div class="timer-digit">22</div>
                              <div class="timer-digit">23</div>
                          </div>
                      </div>
                      <div class="digit-seperator"> </div>
                      <div class="timer-digit-column-wrapper" id="minutes-column" @touchstart="${
                        this._handleTouchStart
                      }" @touchmove="${this._handleTouchMove}" @wheel="${
      this._handleScroll
    }">
                          <div class="timer-digit-column">
                              <div class="timer-digit">  </div>
                              <div class="timer-digit">00</div>
                              <div class="timer-digit">01</div>
                              <div class="timer-digit">02</div>
                              <div class="timer-digit">03</div>
                              <div class="timer-digit">04</div>
                              <div class="timer-digit">05</div>
                              <div class="timer-digit">06</div>
                              <div class="timer-digit">07</div>
                              <div class="timer-digit">08</div>
                              <div class="timer-digit">09</div>
                              <div class="timer-digit">10</div>
                              <div class="timer-digit">11</div>
                              <div class="timer-digit">12</div>
                              <div class="timer-digit">13</div>
                              <div class="timer-digit">14</div>
                              <div class="timer-digit">15</div>
                              <div class="timer-digit">16</div>
                              <div class="timer-digit">17</div>
                              <div class="timer-digit">18</div>
                              <div class="timer-digit">19</div>
                              <div class="timer-digit">20</div>
                              <div class="timer-digit">21</div>
                              <div class="timer-digit">22</div>
                              <div class="timer-digit">23</div>
                              <div class="timer-digit">24</div>
                              <div class="timer-digit">25</div>
                              <div class="timer-digit">26</div>
                              <div class="timer-digit">27</div>
                              <div class="timer-digit">28</div>
                              <div class="timer-digit">29</div>
                              <div class="timer-digit">30</div>
                              <div class="timer-digit">31</div>
                              <div class="timer-digit">32</div>
                              <div class="timer-digit">33</div>
                              <div class="timer-digit">34</div>
                              <div class="timer-digit">35</div>
                              <div class="timer-digit">36</div>
                              <div class="timer-digit">37</div>
                              <div class="timer-digit">38</div>
                              <div class="timer-digit">39</div>
                              <div class="timer-digit">40</div>
                              <div class="timer-digit">41</div>
                              <div class="timer-digit">42</div>
                              <div class="timer-digit">43</div>
                              <div class="timer-digit">44</div>
                              <div class="timer-digit">45</div>
                              <div class="timer-digit">46</div>
                              <div class="timer-digit">47</div>
                              <div class="timer-digit">48</div>
                              <div class="timer-digit">49</div>
                              <div class="timer-digit">50</div>
                              <div class="timer-digit">51</div>
                              <div class="timer-digit">52</div>
                              <div class="timer-digit">53</div>
                              <div class="timer-digit">54</div>
                              <div class="timer-digit">55</div>
                              <div class="timer-digit">56</div>
                              <div class="timer-digit">57</div>
                              <div class="timer-digit">58</div>
                              <div class="timer-digit">59</div>
                          </div>
                      </div>
                      <div class="digit-seperator"> </div>
                      <div class="timer-digit-column-wrapper" id="seconds-column" @touchstart="${
                        this._handleTouchStart
                      }" @touchmove="${this._handleTouchMove}" @wheel="${
      this._handleScroll
    }">
                          <div class="timer-digit-column">
                              <div class="timer-digit">  </div>
                              <div class="timer-digit">00</div>
                              <div class="timer-digit">01</div>
                              <div class="timer-digit">02</div>
                              <div class="timer-digit">03</div>
                              <div class="timer-digit">04</div>
                              <div class="timer-digit">05</div>
                              <div class="timer-digit">06</div>
                              <div class="timer-digit">07</div>
                              <div class="timer-digit">08</div>
                              <div class="timer-digit">09</div>
                              <div class="timer-digit">10</div>
                              <div class="timer-digit">11</div>
                              <div class="timer-digit">12</div>
                              <div class="timer-digit">13</div>
                              <div class="timer-digit">14</div>
                              <div class="timer-digit">15</div>
                              <div class="timer-digit">16</div>
                              <div class="timer-digit">17</div>
                              <div class="timer-digit">18</div>
                              <div class="timer-digit">19</div>
                              <div class="timer-digit">20</div>
                              <div class="timer-digit">21</div>
                              <div class="timer-digit">22</div>
                              <div class="timer-digit">23</div>
                              <div class="timer-digit">24</div>
                              <div class="timer-digit">25</div>
                              <div class="timer-digit">26</div>
                              <div class="timer-digit">27</div>
                              <div class="timer-digit">28</div>
                              <div class="timer-digit">29</div>
                              <div class="timer-digit">30</div>
                              <div class="timer-digit">31</div>
                              <div class="timer-digit">32</div>
                              <div class="timer-digit">33</div>
                              <div class="timer-digit">34</div>
                              <div class="timer-digit">35</div>
                              <div class="timer-digit">36</div>
                              <div class="timer-digit">37</div>
                              <div class="timer-digit">38</div>
                              <div class="timer-digit">39</div>
                              <div class="timer-digit">40</div>
                              <div class="timer-digit">41</div>
                              <div class="timer-digit">42</div>
                              <div class="timer-digit">43</div>
                              <div class="timer-digit">44</div>
                              <div class="timer-digit">45</div>
                              <div class="timer-digit">46</div>
                              <div class="timer-digit">47</div>
                              <div class="timer-digit">48</div>
                              <div class="timer-digit">49</div>
                              <div class="timer-digit">50</div>
                              <div class="timer-digit">51</div>
                              <div class="timer-digit">52</div>
                              <div class="timer-digit">53</div>
                              <div class="timer-digit">54</div>
                              <div class="timer-digit">55</div>
                              <div class="timer-digit">56</div>
                              <div class="timer-digit">57</div>
                              <div class="timer-digit">58</div>
                              <div class="timer-digit">59</div>
                          </div>
                      </div>
                  </div
              </div>
          </div>
          <div class="timer-action-selector ${
            this.entityState == "set" ? "dimmed" : ""
          }">
            <span class="${actionClassList} ${
      this._hass.states[this.entity].attributes.action == "turn_on"
        ? "timer-action-active"
        : ""
    }" id="turn_on" @click="${this._setTimerAction}" @touchstart="${
      this._setTimerAction
    }">Turn on</span>
            <span class="${actionClassList} ${
      this._hass.states[this.entity].attributes.action == "turn_off"
        ? "timer-action-active"
        : ""
    }" id="turn_off" @click="${this._setTimerAction}">Turn off</span>
            <span class="${actionClassList} ${
      this._hass.states[this.entity].attributes.action == "toggle"
        ? "timer-action-active"
        : ""
    } " id="toggle" @click="${this._setTimerAction}">Toggle</span>
          </div>
          <button class="set-timer-button" @click="${this._submitAction}">${
      this.entityState == "idle" ? "Set timer" : "Cancel timer"
    }</button>
        </div>
      </ha-card>`;
  }

  _handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    this.startY = touch.clientY;
    this.lastMoveDeltaY = 0;
  }

  _handleTouchMove(event) {
    event.preventDefault();

    if (this.entityState == "idle") {
      const touch = event.changedTouches[0];
      const endY = touch.clientY;
      const deltaY = this.startY - endY;
      let scrollDirectionUpward;

      if (deltaY > 0) {
        scrollDirectionUpward = true;
      } else if (deltaY < 0) {
        scrollDirectionUpward = false;
      }

      if (Math.abs(deltaY) - this.lastMoveDeltaY >= 20) {
        this.swipeColumn(scrollDirectionUpward, event.currentTarget.id);
        this.lastMoveDeltaY = Math.abs(deltaY);
      }
    }
  }

  _startIntervalUpdater() {
    this.timerUpdateInterval = window.setInterval(() => {
      this._updateRemaningTime(
        this._hass.states[this.entity].attributes.finishing_at
      );
    }, 500);
  }

  _stopIntervalUpdater() {
    window.clearInterval(this.timerUpdateInterval);
    window.timerUpdateInterval = null;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.entityState == "set") {
      this._startIntervalUpdater();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timerUpdateInterval);
  }

  _updateRemaningTime(finishingAt) {
    const finishingTime = new Date(finishingAt);
    const remainingMs = finishingTime - new Date();
    const remainingH = Math.floor(remainingMs / (1000 * 60 * 60));
    const remainingM = Math.floor(remainingMs / (1000 * 60));
    const remainingS = Math.floor(remainingMs / 1000);
    const remainingTime = [
      remainingH,
      remainingM - remainingH * 60,
      remainingS - remainingM * 60,
    ];

    if (this.entityState == "idle") {
      this._stopIntervalUpdater();
      this.hoursColumnMoveIndex = 0;
      this.minutesColumnMoveIndex = 0;
      this.secondsColumnMoveIndex = 0;

      this._moveTimerColumn(this.hoursColumnMoveIndex, "hours-column");
      this._moveTimerColumn(this.minutesColumnMoveIndex, "minutes-column");
      this._moveTimerColumn(this.secondsColumnMoveIndex, "seconds-column");
      this.requestUpdate();
      return null;
    }

    this.hoursColumnMoveIndex = remainingTime[0];
    this.minutesColumnMoveIndex = remainingTime[1];
    this.secondsColumnMoveIndex = remainingTime[2];

    this._moveTimerColumn(this.hoursColumnMoveIndex, "hours-column");
    this._moveTimerColumn(this.minutesColumnMoveIndex, "minutes-column");
    this._moveTimerColumn(this.secondsColumnMoveIndex, "seconds-column");
  }

  _handleScroll(event) {
    if (this.entityState == "idle") {
      const columnWrapper = event.currentTarget;
      const columnWrapperId = columnWrapper.id;
      let indexChange;

      event.preventDefault();

      if (event.deltaY > 0) {
        indexChange = 1;
      } else if (event.deltaY < 0) {
        indexChange = -1;
      }

      let newIndex;
      switch (columnWrapperId) {
        case "hours-column":
          newIndex = this.hoursColumnMoveIndex + indexChange;

          if (newIndex < this.hoursMaxMoveIndex && newIndex >= 0) {
            this.hoursColumnMoveIndex = newIndex;
            this._moveTimerColumn(this.hoursColumnMoveIndex, columnWrapperId);
          }
          break;
        case "minutes-column":
          newIndex = this.minutesColumnMoveIndex + indexChange;
          if (newIndex < this.minutesMaxMoveIndex && newIndex >= 0) {
            this.minutesColumnMoveIndex = newIndex;
            this._moveTimerColumn(this.minutesColumnMoveIndex, columnWrapperId);
          }
          break;
        case "seconds-column":
          newIndex = this.secondsColumnMoveIndex + indexChange;
          if (newIndex < this.secondsMaxMoveIndex && newIndex >= 0) {
            this.secondsColumnMoveIndex = newIndex;
            this._moveTimerColumn(this.secondsColumnMoveIndex, columnWrapperId);
          }
          break;
      }
    }
  }

  swipeColumn(upwardDirection, columnWrapperId) {
    let indexChange;
    let newIndex;

    if (upwardDirection) {
      indexChange = 1;
    } else if (!upwardDirection) {
      indexChange = -1;
    }

    switch (columnWrapperId) {
      case "hours-column":
        newIndex = this.hoursColumnMoveIndex + indexChange;
        if (newIndex < this.hoursMaxMoveIndex && newIndex >= 0) {
          this.hoursColumnMoveIndex = newIndex;
          this._moveTimerColumn(this.hoursColumnMoveIndex, columnWrapperId);
        }
        break;
      case "minutes-column":
        newIndex = this.minutesColumnMoveIndex + indexChange;
        if (newIndex < this.minutesMaxMoveIndex && newIndex >= 0) {
          this.minutesColumnMoveIndex = newIndex;
          this._moveTimerColumn(this.minutesColumnMoveIndex, columnWrapperId);
        }
        break;
      case "seconds-column":
        newIndex = this.secondsColumnMoveIndex + indexChange;
        if (newIndex < this.secondsMaxMoveIndex && newIndex >= 0) {
          this.secondsColumnMoveIndex = newIndex;
          this._moveTimerColumn(this.secondsColumnMoveIndex, columnWrapperId);
        }
        break;
    }
  }

  _moveTimerColumn(columnMoveIndex, columnWrapperId) {
    const columnWrapper = this.shadowRoot.querySelector(
      `#${columnWrapperId} .timer-digit-column`
    );
    columnWrapper.style.transform = `translateY(-${columnMoveIndex * 55}px)`;
  }

  _setTimerAction(clickEvent) {
    if (this.entityState == "idle") {
      this.renderRoot.querySelectorAll(".timer-action").forEach((button) => {
        button.classList.remove("timer-action-active");
      });
      const button = clickEvent.currentTarget;
      button.classList.add("timer-action-active");
      this.timerAction = button.innerHTML;
    }
  }

  _submitAction(clickEvent) {
    if (this.entityState == "idle") {
      this._hass.callService("switch_timer", "set_timer", {
        entity_id: this.entity,
        action: this.timerAction,
        duration: `${String(this.hoursColumnMoveIndex).padStart(
          2,
          "0"
        )}:${String(this.minutesColumnMoveIndex).padStart(2, "0")}:${String(
          this.secondsColumnMoveIndex
        ).padStart(2, "0")}`,
      });

      setTimeout(() => {
        this.requestUpdate();
        this._startIntervalUpdater();
      }, 200);
      setTimeout(() => {
        this._hass.callService("browser_mod", "close_popup", {
          target: "this",
        });
      }, 1500);
    } else if (this.entityState == "set") {
      this._stopIntervalUpdater();
      this._hass.callService("switch_timer", "cancel_timer", {
        entity_id: this.entity,
      });

      this.hoursColumnMoveIndex = 0;
      this.minutesColumnMoveIndex = 0;
      this.secondsColumnMoveIndex = 0;
      this._moveTimerColumn(this.hoursColumnMoveIndex, "hours-column");
      this._moveTimerColumn(this.minutesColumnMoveIndex, "minutes-column");
      this._moveTimerColumn(this.secondsColumnMoveIndex, "seconds-column");
      setTimeout(() => {
        this.requestUpdate();
      }, 200);
    }
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error("No timer entity supplied");
    } else if (!config.entity.startsWith("switch_timer.")) {
      throw new Error(
        "The supplied entity is not a valid 'switch_timer' entity"
      );
    }
    this.entity = config.entity;
  }

  getCardSize() {
    return 3;
  }
}
customElements.define("set-timer-popup-card", SetTimerCard);
