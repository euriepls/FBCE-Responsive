// ==UserScript==
// @name FBCE Nabi ver 2.4 (WCE + LCE)
// @namespace https://www.bondageprojects.com/
// @version 0.2
// @description Customize the expressions used by FBC / WCE, with an adapter for Liko's Club Extension (LCE)
// @author Sidious
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://www.bondage-asia.com/*
// @match https://www.bondageeurope.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==
/* eslint-disable camelcase */

/**
 *     BCE
 *  Copyright (C) 2022  Sid
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function () {
	"use strict";

	const w = window;
	const LOG = "[FBCE Nabi]";

	if (typeof ChatRoomCharacter === "undefined") {
		console.warn(
			"Bondage Club not detected. Skipping BCE customizer initialization."
		);
		return;
	}

	/* ------------------------------------------------------------------ */
	/*  CONFIG DATA (same content as the original script)                  */
	/* ------------------------------------------------------------------ */

	// NOTICE: You may delete the ArousalExpressionStages or EventExpressions sections if you don't want to use them, and leave only one. The other will use defaults. EventExpressions must contain keys for all events that ActivityTriggers trigger.

	const ArousalExpressionStages = {/*
		Blush: [
			{ Expression: "Extreme", Limit: 100 },
			{ Expression: "VeryHigh", Limit: 90 },
			{ Expression: "High", Limit: 70 },
			{ Expression: "Medium", Limit: 50 },
			{ Expression: "Low", Limit: 20 },
			{ Expression: null, Limit: 0 },
		],
		Eyebrows: [
			{ Expression: "Soft", Limit: 80 },
			{ Expression: "Lowered", Limit: 50 },
			{ Expression: "Raised", Limit: 20 },
			{ Expression: null, Limit: 0 },
		],
		Fluids: [
			{ Expression: "DroolMessy", Limit: 99 },
			{ Expression: "DroolMedium", Limit: 90 },
			{ Expression: "DroolSides", Limit: 80 },
			{ Expression: "DroolLow", Limit: 50 },
			{ Expression: null, Limit: 0 },
		],
		Eyes: [
			{ Expression: "VeryLewd", Limit: 100 },
			{ Expression: "Lewd", Limit: 95 },
			{ Expression: "Horny", Limit: 70 },
			{ Expression: "Sad", Limit: 20 },
			{ Expression: null, Limit: 0 },
		],
		Eyes2: [
			{ Expression: "VeryLewd", Limit: 100 },
			{ Expression: "Lewd", Limit: 95 },
			{ Expression: "Horny", Limit: 70 },
			{ Expression: "Sad", Limit: 20 },
			{ Expression: null, Limit: 0 },
		],
		Mouth: [
			{ Expression: "Ahegao", Limit: 100 },
			{ Expression: "Moan", Limit: 95 },
			{ Expression: "HalfOpen", Limit: 90 },
			{ Expression: "LipBite", Limit: 80 },
			{ Expression: "HalfOpen", Limit: 40 },
			{ Expression: null, Limit: 0 },
		],
		//
