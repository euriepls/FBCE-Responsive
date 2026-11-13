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
		// Pussy group includes Penis, which is the only type of "pussy" with expressions and controls erections.
		Pussy: [
			{ Expression: "Hard", Limit: 50 },
			{ Expression: null, Limit: 0 },
		],
	*/};

	/**
	 * Event expressions. See the original FBC/WCE documentation for the data model:
	 * - Type, Duration, Priority, Expression (per face component timelines), Poses (pose timelines)
	 */
	const EventExpressions = {
		PostOrgasm: {
			Type: "PostOrgasm",
			Duration: 18500,
			Expression: {
				Blush: [
					{ Expression: "Extreme", Duration: 5000 },
					{ ExpressionModifier: -1, Duration: 13500 }
				],
				Eyes: [
					{ Expression: "Closed", Duration: 8500 },
					{ Expression: "Heart", Duration: 10000 },
				],
				Eyes2: [
					{ Expression: "Closed", Duration: 7500 },
					{ Expression: "Heart", Duration: 11000 },
				],
				Mouth: [
					{ Expression: "Ahegao", Duration: 4000 },
					{ Expression: "Moan", Duration: 4000 },
					{ Expression: "HalfOpen", Duration: 3000 },
					{ Expression: "LipBite", Duration: 7000,},
				],
				Fluids: [
					{ Expression: "DroolMessy", Duration: 5000 },
					{ Expression: "DroolSides", Duration: 3000 },
					{ Expression: "DroolLow", Duration: 8500, },
				],
				Eyebrows: [
					{ Expression: "Soft", Duration: 18500 },
				],
			},
		},
		Pout: {
			Type: "Pout",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Pout", Duration: -1 }],
				Eyes: [{ Expression: "Dazed", Duration: -1 }],
				Eyes2: [{ Expression: "Dazed", Duration: -1 }],
				Eyebrows: [{ Expression: "Harsh", Duration: -1 }],
			},
		},
		ResetBrows: {
			Type: "ResetBrows",
			Duration: -1,
			Expression: {
				Eyebrows: [{ Expression: null, Duration: -1 }],
			},
		},
		RaiseBrows: {
			Type: "RaiseBrows",
			Duration: -1,
			Expression: {
				Eyebrows: [{ Expression: "Raised", Duration: -1 }],
			},
		},
		Confused: {
			Type: "Confused",
			Duration: -1,
			Expression: {
				Eyebrows: [{ Expression: "OneRaised", Duration: -1 }],
			},
		},
		Smirk: {
			Type: "Smirk",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Smirk", Duration: -1 }],
			},
		},
		Wink: {
			Type: "Wink",
			Duration: 1500,
			Expression: {
				Eyes: [{ Expression: "Closed", Duration: 1500 }],
			},
		},
		Laugh: {
			Type: "Laugh",
			Duration: 8000,
			Expression: {
				Mouth: [
					{ Expression: "Laughing", Duration: 1000 },
					{ Expression: "Grin", Duration: 200 },
					{ Expression: "Laughing", Duration: 1000 },
					{ Expression: "Happy", Duration: 200 },
					{ Expression: "Laughing", Duration: 800 },
					{ Expression: "Grin", Duration: 400 },
					{ Expression: "Laughing", Duration: 800 },
					{ Expression: "Happy", Duration: 400 },
					{ Expression: "Laughing", Duration: 600 },
					{ Expression: "Grin", Duration: 600 },
					{ Expression: "Laughing", Duration: 600 },
					{ Expression: "Happy", Duration: 600 },
					{ Expression: "Laughing", Duration: 200 },
					{ Expression: "Grin", Duration: 200 },
					{ Expression: "Laughing", Duration: 200 },
					{ Expression: "Happy", Duration: 200 },
				],
			},
		},
		Giggle: {
			Type: "Giggle",
			Duration: 4000,
			Expression: {
				Mouth: [
					{ Expression: "Laughing", Duration: 800 },
					{ Expression: "Grin", Duration: 200 },
					{ Expression: "Laughing", Duration: 700 },
					{ Expression: "Happy", Duration: 200 },
					{ Expression: "Laughing", Duration: 600 },
					{ Expression: "Grin", Duration: 200 },
					{ Expression: "Laughing", Duration: 500 },
					{ Expression: "Grin", Duration: 200 },
					{ Expression: "Laughing", Duration: 400 },
					{ Expression: "Happy", Duration: 200 },
				],
			},
		},
		Chuckle: {
			Type: "Chuckle",
			Duration: 4000,
			Expression: {
				Mouth: [{ Expression: "Grin", Duration: 4000 }],
			},
		},
		Smile: {
			Type: "Smile",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Grin", Duration: -1 }],
			},
		},
		Blink: {
			Type: "Blink",
			Duration: 200,
			Expression: {
				Eyes: [{ Expression: "Closed", Duration: 200 }],
				Eyes2: [{ Expression: "Closed", Duration: 200 }],
			},
		},
		Grin: {
			Type: "Grin",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Horny", Duration: -1 }],
				Eyes2: [{ Expression: "Horny", Duration: -1 }],
				Mouth: [{ Expression: "Grin", Duration: -1 }],
			},
		},
		Hug: {
			Type: "Hug",
			Duration: 10000,
			Priority: 150,
			Expression: {
				Eyes: [{ Expression: "Daydream", Duration: 5000 }],
				Eyes2: [{ Expression: "Daydream", Duration: 5000 }],
				//Eyebrows: [{ Expression: "Raised", Duration: 5000 }],
			},
		},
		Blush: {
			Type: "Blush",
			Duration: 10000,
			Expression: {
				Blush: [{ ExpressionModifier: 1, Duration: 10000 }],
			},
		},
		Choke: {
			Type: "Choke",
			Duration: 4000,
			Priority: 150,
			Expression: {
				Blush: [{ ExpressionModifier: 3, Duration: 4000 }],
				Eyes: [
					{ Expression: "VeryLewd", Duration: 3000 },
					{ Expression: "Frown", Duration: 1000 },
				],
				Eyes2: [
					{ Expression: "VeryLewd", Duration: 3000 },
					{ Expression: "Sad", Duration: 1000 },
				],
				Eyebrows: [{ Expression: "Harsh", Duration: 4000 }],
			},
		},
		Stimulated: {
			Type: "Stimulated",
			Duration: 5000,
			Priority: 400,
			Expression: {
				Blush: [{ ExpressionModifier: 2, Duration: 5000 }],
				Eyes: [
					{ Expression: "VeryLewd", Duration: 4000 },
					{ Expression: "Sad", Duration: 1000 },
				],
				Eyes2: [
					{ Expression: "VeryLewd", Duration: 4000 },
					{ Expression: "Sad", Duration: 1000 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: 5000 }],
			},
		},
		StimulatedLong: {
			Type: "StimulatedLong",
			Duration: -1,
			Priority: 400,
			Expression: {
				Blush: [
					{ ExpressionModifier: 1, Duration: -1 },
				],
				Eyes: [
					{ Expression: "LewdHeart", Duration: 2800 },
					{ Expression: "Closed", Duration: 200 },
					{ Expression: "Heart", Duration: 7000 },
					//{ Expression: "Closed", Duration: 200 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyes2: [
					{ Expression: "LewdHeart", Duration: 500 },
					{ Expression: "Closed", Duration: 9500 },
					{ Expression: "Heart", Duration: -1 },
				],
				Mouth: [
					{ Expression: "LipBite", Duration: 5000 },
					//{ Expression: "LipBite", Duration: 3000 },
					{ Expression: "Frown", Duration: -1 },
				],
				Fluids: [
					{ Expression: "DroolLow", Duration: -1, },
				],
				Eyebrows: [
					{ Expression: "Soft", Duration: -1 },
				],
			},
		},
		Shock: {
			Type: "Shock",
			Duration: 15000,
			Priority: 1000,
			Expression: {
				Blush: [{ ExpressionModifier: 5, Duration: 15000 }],
				Eyes: [
					{ Expression: "Dizzy", Duration: 1000 },
					{ Expression: "Scared", Duration: 8000 },
					{ Expression: "Surprised", Duration: 7000 },
				],
				Eyes2: [
					{ Expression: "Dizzy", Duration: 1000 },
					{ Expression: "Scared", Duration: 8000 },
					{ Expression: "Surprised", Duration: 7000 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: 15000 }],
				Mouth: [{ Expression: "Frown", Duration: 15000 }],
			},
		},
		Hit: {
			Type: "Hit",
			Duration: 7000,
			Priority: 500,
			Expression: {
				Blush: [{ Expression: "VeryHigh", Duration: 7000 }],
				Eyes: [
					{ Expression: "Daydream", Duration: 1000 },
					{ Expression: "Closed", Duration: 3000 },
					{ Expression: "Daydream", Duration: 3000 },
				],
				Eyes2: [
					{ Expression: "Daydream", Duration: 1000 },
					{ Expression: "Closed", Duration: 3000 },
					{ Expression: "Daydream", Duration: 3000 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: 7000 }],
			},
		},
		Spank: {
			Type: "Spank",
			Duration: 3000,
			Priority: 300,
			Expression: {
				Eyes: [{ Expression: "LewdHeart", Duration: 3000 }],
				Eyes2: [{ Expression: "LewdHeart", Duration: 3000 }],
				Eyebrows: [{ Expression: "Soft", Duration: 3000 }],
			},
		},
		Kiss: {
			Type: "Kiss",
			Duration: 2000,
			Priority: 200,
			Expression: {
				Mouth: [{ Expression: "HalfOpen", Duration: 2000 }],
			},
		},
		KissOnLips: {
			Type: "KissOnLips",
			Duration: 2000,
			Priority: 200,
			Expression: {
				Eyes: [{ Expression: "Closed", Duration: 2000 }],
				Eyes2: [{ Expression: "Closed", Duration: 2000 }],
				Mouth: [{ Expression: "HalfOpen", Duration: 2000 }],
				Blush: [
					{ Skip: true, Duration: 1000 },
					{ ExpressionModifier: 1, Duration: 1000 },
				],
			},
		},
		LongKiss: {
			Type: "LongKiss",
			Duration: 4000,
			Priority: 200,
			Expression: {
				Eyes: [{ Expression: "Closed", Duration: 4000 }],
				Eyes2: [{ Expression: "Closed", Duration: 4000 }],
				Mouth: [{ Expression: "Open", Duration: 4000 }],
				Blush: [
					{ Skip: true, Duration: 1000 },
					{ ExpressionModifier: 1, Duration: 1000 },
					{ ExpressionModifier: 1, Duration: 2000 },
				],
			},
		},
		Disoriented: {
			Type: "Disoriented",
			Duration: 8000,
			Priority: 250,
			Expression: {
				Eyes: [{ Expression: "Dizzy", Duration: 8000 }],
				Eyes2: [{ Expression: "Dizzy", Duration: 8000 }],
				Eyebrows: [{ Expression: "Raised", Duration: 8000 }],
				Blush: [{ ExpressionModifier: 1, Duration: 8000 }],
			},
		},
		Angry: {
			Type: "Angry",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Angry", Duration: -1 }],
				Eyes: [{ Expression: "Angry", Duration: -1 }],
				Eyes2: [{ Expression: "Angry", Duration: -1 }],
				Eyebrows: [{ Expression: "Angry", Duration: -1 }],
			},
		},
		Sad: {
			Type: "Sad",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Frown", Duration: -1 }],
				Eyes: [{ Expression: "Shy", Duration: -1 }],
				Eyes2: [{ Expression: "Shy", Duration: -1 }],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
			},
		},
		Worried: {
			Type: "Worried",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Surprised", Duration: -1 }],
				Eyes2: [{ Expression: "Surprised", Duration: -1 }],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
			},
		},
		Distressed: {
			Type: "Distressed",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Scared", Duration: -1 }],
				Eyes2: [{ Expression: "Scared", Duration: -1 }],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
				Mouth: [{ Expression: "Frown", Duration: -1 }],
			},
		},
		Reset: {
			Type: "Reset",
		},
		Cry: {
			Type: "Cry",
			Duration: -1,
			Expression: {
				Drool: [{ Expression: "TearsMedium", Duration: -1 }],
			},
		},
		DroolReset: {
			Type: "DroolReset",
			Duration: -1,
			Expression: {
				Fluids: [{ Expression: null, Duration: -1 }],
			},
		},
		DroolSides: {
			Type: "DroolSides",
			Duration: -1,
			Expression: {
				Fluids: [{ Expression: "DroolSides", Duration: -1 }],
			},
		},
		BareTeeth: {
			Type: "BareTeeth",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Angry", Duration: -1 }],
			},
		},
		Happy: {
			Type: "Happy",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Happy", Duration: -1 }],
			},
		},
		Frown: {
			Type: "Frown",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Frown", Duration: -1 }],
			},
		},
		Glare: {
			Type: "Glare",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Angry", Duration: -1 }],
				Eyes2: [{ Expression: "Angry", Duration: -1 }],
				Eyebrows: [{ Expression: "Harsh", Duration: -1 }],
			},
		},
		NarrowEyes: {
			Type: "NarrowEyes",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Horny", Duration: -1 }],
				Eyes2: [{ Expression: "Horny", Duration: -1 }],
			},
		},
		OpenEyes: {
			Type: "OpenEyes",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: null, Duration: -1 }],
				Eyes2: [{ Expression: null, Duration: -1 }],
			},
		},
		CloseEyes: {
			Type: "CloseEyes",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Closed", Duration: -1 }],
				Eyes2: [{ Expression: "Closed", Duration: -1 }],
			},
		},
		CloseMouth: {
			Type: "CloseMouth",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: null, Duration: -1 }],
			},
		},
		OpenMouth: {
			Type: "OpenMouth",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "Moan", Duration: -1 }],
			},
		},
		LipBite: {
			Type: "LipBite",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "LipBite", Duration: -1 }],
			},
		},
		Lick: {
			Type: "Lick",
			Duration: 4000,
			Priority: 200,
			Expression: {
				Mouth: [{ Expression: "Ahegao", Duration: 2000 }],
				Blush: [{ ExpressionModifier: 1, Duration: 4000 }],
			},
		},
		GagInflate: {
			Type: "GagInflate",
			Duration: 4000,
			Priority: 400,
			Expression: {
				Eyes: [{ Expression: "Lewd", Duration: 4000 }],
				Eyes2: [{ Expression: "Lewd", Duration: 4000 }],
				Blush: [
					{ ExpressionModifier: 1, Duration: -1 },
				],
			},
		},
		Iced: {
			Type: "Iced",
			Duration: 4000,
			Priority: 500,
			Expression: {
				Eyes: [
					{ Expression: "Surprised", Duration: 3000 },
					{ Expression: null, Duration: 1000 },
				],
				Eyes2: [
					{ Expression: "Surprised", Duration: 3000 },
					{ Expression: null, Duration: 1000 },
				],
				Mouth: [{ Expression: "Frown", Duration: 4000 }],
			},
		},
		AllFours: {
			Type: "AllFours",
			Duration: -1,
			Poses: [{ Pose: ["AllFours"], Duration: -1 }],
		},
		SpreadKnees: {
			Type: "SpreadKnees",
			Duration: -1,
			Poses: [{ Pose: ["KneelingSpread"], Duration: -1 }],
		},
		Hogtied: {
			Type: "Hogtied",
			Duration: -1,
			Poses: [{ Pose: ["Hogtied"], Duration: -1 }],
		},
		Handstand: {
			Type: "Handstand",
			Duration: -1,
			Poses: [{ Pose: ["Suspension", "OverTheHead"], Duration: -1 }],
		},
		Stretch: {
			Type: "Stretch",
			Priority: 100,
			Duration: 6000,
			Poses: [
				{ Pose: ["OverTheHead"], Duration: 1000 },
				{ Pose: ["Yoked"], Duration: 1000 },
				{ Pose: ["BaseUpper"], Duration: 1000 },
				{ Pose: ["Spread"], Duration: 1000 },
				{ Pose: ["LegsClosed"], Duration: 1000 },
				{ Pose: ["BaseLower"], Duration: 1000 },
			],
		},
		SpreadLegs: {
			Type: "SpreadLegs",
			Duration: -1,
			Poses: [{ Pose: ["Spread"], Duration: -1 }],
		},
		JumpingJacks: {
			Type: "JumpingJacks",
			Priority: 100,
			Duration: 8000,
			Poses: [
				{ Pose: ["OverTheHead", "Spread"], Duration: 1000 },
				{ Pose: ["BaseUpper", "LegsClosed"], Duration: 1000 },
				{ Pose: ["OverTheHead", "Spread"], Duration: 1000 },
				{ Pose: ["BaseUpper", "LegsClosed"], Duration: 1000 },
				{ Pose: ["OverTheHead", "Spread"], Duration: 1000 },
				{ Pose: ["BaseUpper", "LegsClosed"], Duration: 1000 },
				{ Pose: ["OverTheHead", "Spread"], Duration: 1000 },
				{ Pose: ["BaseUpper", "LegsClosed"], Duration: 1000 },
			],
		},
		Boop: {
			Type: "Boop",
			Duration: 8000,
			Expression: {
				Mouth: [{ Expression: "Pout", Duration: 6000 }],
				Eyes: [{ Expression: "Daydream", Duration: 4000 }],
				Eyes2: [{ Expression: "Daydream", Duration: 4000 }],
				Eyebrows: [{ Expression: "Soft", Duration: 8000 }],
			},
		},
		NibbleEar: {
			Type: "NibbleEar",
			Duration: 9000,
			Expression: {
				Mouth: [{ Expression: "Frown", Duration: 9000 }],
				Eyes: [{ Expression: "Daydream", Duration: 3000 }],
				Eyes2: [{ Expression: "Daydream", Duration: 4500 }],
				Eyebrows: [{ Expression: "Soft", Duration: 9000 }],
				Blush: [{ ExpressionModifier: 1, Duration: 6000 }],
			},
		},
		ButtTouch: {
			Type: "ButtTouch",
			Duration: 9000,
			Expression: {
				Mouth: [{ Expression: "null", Duration: 9000 }],
				Eyes: [
					{ Expression: "Daydream", Duration: 2500 },
					{ Expression: "Surprised", Duration: 3500 },
				],
				Eyes2: [
					{ Expression: "Daydream", Duration: 2500 },
					{ Expression: "Surprised", Duration: 3500 },
				],
				Eyebrows: [{ Expression: soft, Duration: 9000 }],
				Blush: [{ ExpressionModifier: 1, Duration: 7500 }],
			},
		},
		GentleTouch: {
			Type: "GentleTouch",
			Duration: -1,
			Expression: {
				// (the original had a duplicate "Mouth" key here; the last one won, so only that one is kept)
				Mouth: [{ Expression: "LipBite", Duration: 12000 }],
				Eyes: [
					{ Expression: "Closed", Duration: 2000 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyes2: [
					{ Expression: "Closed", Duration: 2750 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
				Blush: [{ Expression: "VeryHigh", Duration: -1 },],
			},
		},
		Intensedistress: {
			Type: "Intensedistress",
			Duration: -1,
			Expression: {
				Mouth: [
					{ Expression: "Frown", Duration: 1250 },
					{ Expression: "HalfOpen", Duration: 1000 },
					{ Expression: "LipBite", Duration: -1 },
				],
				Eyes2: [
					{ Expression: "Daydream", Duration: 2750 },
					//{ Expression: "Closed", Duration: 3000 },
					{ Expression: "Surprised", Duration: -1 },
				],
				Eyes: [
					{ Expression: "Scared", Duration: 1000 },
					{ Expression: "Daydream", Duration: 1500 },
					{ Expression: "Surprised", Duration: -1 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
				Blush: [{ Expression: "VeryHigh", Duration: -1 },],
			},
		},
		IntenseStimuli: {
			Type: "IntenseStimuli",
			Duration: -1,
			Expression: {
				Mouth: [
					{ Expression: "Frown", Duration: 750 },
					//{ Expression: "HalfOpen", Duration: 500 },
					{ Expression: "LipBite", Duration: 9250 },
					{ Expression: "Frown", Duration: -1 }
				],
				Eyes2: [
					//{ Expression: "LewdHeart", Duration: 750 },
					{ Expression: "Closed", Duration: 6000 },
					//{ Expression: "Daydream", Duration: 500 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyes: [
					{ Expression: "LewdHeart", Duration: 4000 },
					//{ Expression: "Daydream", Duration: 500 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
				Blush: [{ Expression: "VeryHigh", Duration: -1 },],
			},
		},
		LickEar: {
			Type: "LickEar",
			Duration: -1,
			Expression: {
				Mouth: [{ Expression: "LipBite", Duration: 9000 }],
				Eyes: [
					{ Expression: "Closed", Duration: 2500 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyes2: [
					{ Expression: "Closed", Duration: 3500 },
					{ Expression: "Heart", Duration: -1 },
				],
				Eyebrows: [{ Expression: "Soft", Duration: -1 }],
				Blush: [{ Expression: "VeryHigh", Duration: -1 },],
			},
		},
		HairBrush: {
			Type: "HairBrush",
			Duration: -1,
			Expression: {
				Eyes: [	{ Expression: "Closed", Duration: 2500 },],
				Eyes2: [{ Expression: "Closed", Duration: 3000 },],
			},
		},
		HeadPet: {
			Type: "HeadPet",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Daydream", Duration: 2500 }],
				Eyes2: [{ Expression: "Daydream", Duration: 3000 }],
			},
		},
		Nuzzle: {
			Type: "Nuzzle",
			Duration: -1,
			Expression: {
				Eyes: [{ Expression: "Daydream", Duration: 2500 }],
				Eyes2: [{ Expression: "Daydream", Duration: 2750 }],
			},
		},
	};

	/**
	 * Maps incoming messages to expressions (Event / Type / Matchers / Criteria).
	 */
	const ActivityTriggers = [
		{ Event: "Blush", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-PoliteKiss$/u }] },
		{ Event: "Stretch", Type: "Emote", Matchers: [{ Tester: /^stretches($| her)/u }] },
		{ Event: "JumpingJacks", Type: "Emote", Matchers: [{ Tester: /^does jumping[ -]?jacks/u }] },
		{ Event: "AllFours", Type: "Emote", Matchers: [{ Tester: /^(gets on all fours|starts crawling)/u }] },
		{ Event: "SpreadKnees", Type: "Emote", Matchers: [{ Tester: /^spreads(( her legs)? on)? her knees/u }] },
		{ Event: "SpreadLegs", Type: "Emote", Matchers: [{ Tester: /^spreads her legs/u }] },
		{ Event: "Handstand", Type: "Emote", Matchers: [{ Tester: /^(does a handstand|stands on her hands)/u }] },
		{ Event: "Hogtied", Type: "Emote", Matchers: [{ Tester: /^lies( down)? on (the floor|her (tummy|stomach))/u }] },
		{ Event: "Blush", Type: "Emote", Matchers: [{ Tester: /^blushes/u }] },
		{ Event: "Chuckle", Type: "Emote", Matchers: [{ Tester: /^chuckles/u }] },
		{ Event: "Laugh", Type: "Emote", Matchers: [{ Tester: /^laughs/u }] },
		{ Event: "Giggle", Type: "Emote", Matchers: [{ Tester: /^giggles/u }] },
		{ Event: "Smirk", Type: "Emote", Matchers: [{ Tester: /^(smirk(s|ing)|.*with a smirk)/u }] },
		{ Event: "Wink", Type: "Emote", Matchers: [{ Tester: /^winks/u }] },
		{ Event: "Pout", Type: "Emote", Matchers: [{ Tester: /^pouts/u }] },
		{ Event: "Blink", Type: "Emote", Matchers: [{ Tester: /^blinks/u }] },
		{ Event: "Frown", Type: "Emote", Matchers: [{ Tester: /^frowns/u }] },
		{ Event: "Grin", Type: "Emote", Matchers: [{ Tester: /^(grins|is grinning)/u }] },
		{
			Event: "Confused",
			Type: "Emote",
			Matchers: [{ Tester: /^((seems|looks) (confused|curious|suspicious)|raises an eyebrow)/u }],
		},
		{ Event: "CloseMouth", Type: "Emote", Matchers: [{ Tester: /^closes her mouth/u }] },
		{ Event: "OpenMouth", Type: "Emote", Matchers: [{ Tester: /^opens her mouth/u }] },
		{ Event: "Happy", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets|smiles) happ(il)?y/u }] },
		{ Event: "Smile", Type: "Emote", Matchers: [{ Tester: /^smiles/u }] },
		{ Event: "Distressed", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) distressed/u }] },
		{ Event: "Sad", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) sad/u }] },
		{ Event: "Worried", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) (worried|surprised)/u }] },
		{ Event: "BareTeeth", Type: "Emote", Matchers: [{ Tester: /^(bares her teeth|snarls)/u }] },
		{ Event: "Angry", Type: "Emote", Matchers: [{ Tester: /^(looks angr(il)?y|(gets|is|seems) angry)/u }] },
		{
			Event: "Glare",
			Type: "Emote",
			Matchers: [{ Tester: /^(glares|looks harshly|gives a (glare|harsh look))/u }],
		},
		{ Event: "OpenEyes", Type: "Emote", Matchers: [{ Tester: /^opens her eyes/u }] },
		{
			Event: "NarrowEyes",
			Type: "Emote",
			Matchers: [{ Tester: /^((squints|narrows) her eyes|narrowly opens her eyes)/u }],
		},
		{ Event: "CloseEyes", Type: "Emote", Matchers: [{ Tester: /^closes her eyes/u }] },
		{ Event: "ResetBrows", Type: "Emote", Matchers: [{ Tester: /^lowers her eyebrows/u }] },
		{ Event: "RaiseBrows", Type: "Emote", Matchers: [{ Tester: /^raises her eyebrows/u }] },
		{ Event: "DroolSides", Type: "Emote", Matchers: [{ Tester: /^drools/u }] },
		{
			Event: "Cry",
			Type: "Emote",
			Matchers: [{ Tester: /^(starts to cry|sheds .* tears?|eyes( start( to)?)? leak)/u }],
		},
		{ Event: "Reset", Type: "Emote", Matchers: [{ Tester: /^'s (expression|face) returns to normal/u }] },
		{
			Event: "Shock",
			Type: "Action",
			Matchers: [
				{
					Tester:
						/^(ActionActivityShockItem|FuturisticVibratorShockTrigger|FuturisticChastityBeltShock\w+|(TriggerShock|(ShockCollar|Collar(Auto)?ShockUnit|(LoveChastityBelt|SciFiPleasurePanties)Shock)Trigger)(1|2))$/u,
					Criteria: { TargetIsPlayer: true },
				},
			],
		},
		{
			Event: "ShockLight",
			Type: "Action",
			Matchers: [
				{
					Tester:
						/^(TriggerShock|(ShockCollar|Collar(Auto)?ShockUnit|(LoveChastityBelt|SciFiPleasurePanties)Shock)Trigger)0$/u,
					Criteria: { TargetIsPlayer: true },
				},
			],
		},
		{
			Event: "Hit",
			Type: "Action",
			Matchers: [{ Tester: /^ActionActivitySpankItem$/u, Criteria: { TargetIsPlayer: true } }],
		},
		{
			Event: "Spank",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemButt-Spank$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemButt-Spank$/u },
			],
		},
		{
			Event: "Hug",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-.*-(SistersHug|LSCG_Hug|Cuddle)$/u },
				{ Tester: /^ChatSelf-.*-(SistersHug|LSCG_Hug|Cuddle)$/u },
			],
		},
		{
			Event: "Nuzzle",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-.*-(Rub|LSCG_Nuzzle)$/u },
				{ Tester: /^ChatSelf-.*-(Rub|LSCG_Nuzzle)$/u },
			],
		},
		{
			Event: "Stimulated",
			Type: "Action",
			Matchers: [{ Tester: /^ActionActivityMasturbateItem$/u, Criteria: { TargetIsPlayer: true } }],
		},
		{
			Event: "StimulatedLong",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-.*-(Masturbate|Penetrate).*$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-.*-(Masturbate|Penetrate).*$/u },
			],
		},
		{ Event: "KissOnLips", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-Kiss$/u }] },
		{
			Event: "Kiss",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-.*-Kiss$/u, Criteria: { SenderIsPlayer: true } }],
		},
		{ Event: "Disoriented", Type: "Action", Matchers: [{ Tester: /^(KneelDown|StandUp)Fail$/u }] },
		{ Event: "LipBite", Type: "Activity", Matchers: [{ Tester: /^ChatSelf-ItemMouth-Bite$/u }] },
		{
			Event: "Lick",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-.*-(Lick|MasturbateTongue)$/u, Criteria: { SenderIsPlayer: true } }],
		},
		{
			Event: "DroolReset",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemMouth-Caress$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemMouth-Caress$/u },
			],
		},
		{ Event: "LongKiss", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-FrenchKiss$/u }] },
		{
			Event: "Boop",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemNose-Pet$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemNose-Pet$/u },
			],
		},
		{
			Event: "NibbleEar",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-ItemEars-Nibble$/u, Criteria: { TargetIsPlayer: true } }],
		},
		{
			Event: "ButtTouch",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemButt-Grope$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemButt-Grope$/u },
			],
		},
		{
			Event: "GentleTouch",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemVulvaPiercings-Caress$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemVulvaPiercings-Caress$/u },
				{ Tester: /^ChatOther-ItemVulva-Caress$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemVulva-Caress$/u },
				{ Tester: /^ChatOther-ItemNipples-Caress$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemNipples-Caress$/u },
				{ Tester: /^ChatOther-ItemBreast-Caress$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemBreast-Caress$/u },
			],
		},
		{
			Event: "Intensedistress",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-(ItemNipples|ItemEars)-Pinch$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-(ItemNipples|ItemEars)-Pinch$/u },
			],
		},
		{
			Event: "IntenseStimuli",
			Type: "Activity",
			Matchers: [
				{ Tester: /^ChatOther-ItemNipples-(揉搓乳头|Pull)$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemNipples-(揉搓乳头|Pull)$/u },
				{ Tester: /^ChatOther-ItemVulvaPiercings-弹阴蒂$/u, Criteria: { TargetIsPlayer: true } },
				{ Tester: /^ChatSelf-ItemVulvaPiercings-弹阴蒂$/u },
				{
					Tester: /^ChatOther-(ItemVulva|ItemVulvaPiercings|ItemNipples)-LSCG_Flick$/u,
					Criteria: { TargetIsPlayer: true },
				},
				{ Tester: /^ChatSelf-(ItemVulva|ItemVulvaPiercings|ItemNipples)-LSCG_Flick$/u },
			],
		},
		{
			Event: "LickEar",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-ItemEars-Lick$/u, Criteria: { TargetIsPlayer: true } }],
		},
		{
			Event: "HairBrush",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-ItemHead-TakeCare$/u, Criteria: { TargetIsPlayer: true } }],
		},
		{
			Event: "HeadPet",
			Type: "Activity",
			Matchers: [{ Tester: /^ChatOther-ItemHead-Pet$/u, Criteria: { TargetIsPlayer: true } }],
		},
	];

	/* ------------------------------------------------------------------ */
	/*  HELPERS                                                            */
	/* ------------------------------------------------------------------ */

	/** Resolves true when func() is truthy, or false after timeoutMs. */
	async function waitFor(func, timeoutMs = 60000) {
		const start = Date.now();
		while (!func()) {
			if (Date.now() - start > timeoutMs) return false;
			// eslint-disable-next-line no-await-in-loop
			await sleep(100);
		}
		return true;
	}

	function sleep(ms) {
		// eslint-disable-next-line no-promise-executor-return
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const hasWCE = () => typeof w.bce_initializeDefaultExpression !== "undefined";
	const hasLCE = () => !!w.Liko?.LCE;

	/** The WCE / FBC way: expose the config as globals. */
	function installGlobals() {
		w.bce_ArousalExpressionStages = ArousalExpressionStages;
		w.bce_EventExpressions = EventExpressions;
		w.bce_ActivityTriggers = ActivityTriggers;
	}

	/**
	 * LCE adapter (best effort, UNVERIFIED against LCE's source).
	 * LCE exposes a read-only getter Liko.LCE.expressionData. We try to merge our events into it
	 * and log everything so it is obvious from the console what worked.
	 */
	function installLCE() {
		const LCE = w.Liko.LCE;
		console.log(`${LOG} LCE detected, version:`, LCE.version);

		let table;
		try {
			table = LCE.expressionData;
		} catch (e) {
			console.warn(`${LOG} could not read LCE.expressionData:`, e);
			return;
		}
		if (!table || typeof table !== "object") {
			console.warn(`${LOG} LCE.expressionData is not an object:`, table);
			return;
		}

		const before = Object.keys(table);
		console.log(`${LOG} LCE.expressionData has ${before.length} entries, e.g.:`, before.slice(0, 10));

		// LCE's table has 3 keys mirroring the bce_* globals. The top level is locked, so work on the inner objects.
		const clone = (v) => (typeof structuredClone === "function" ? structuredClone(v) : v);
		const info = (o) => (o ? { frozen: Object.isFrozen(o), extensible: Object.isExtensible(o) } : null);
		console.log(`${LOG} inner state:`, {
			EventExpressions: info(table.EventExpressions),
			ActivityTriggers: info(table.ActivityTriggers),
			ArousalExpressionStages: info(table.ArousalExpressionStages),
			eventCount: table.EventExpressions ? Object.keys(table.EventExpressions).length : null,
			triggerCount: Array.isArray(table.ActivityTriggers) ? table.ActivityTriggers.length : null,
		});

		// 1) EventExpressions: add/replace each event
		let merged = 0;
		if (table.EventExpressions && Object.isExtensible(table.EventExpressions)) {
			for (const [name, value] of Object.entries(EventExpressions)) {
				try { table.EventExpressions[name] = clone(value); merged++; } catch (e) { /* skip */ }
			}
		}
		console.log(`${LOG} EventExpressions merged ${merged}/${Object.keys(EventExpressions).length}`);

		// 2) ActivityTriggers: replace the array contents in place
		let triggersOk = false;
		if (Array.isArray(table.ActivityTriggers) && !Object.isFrozen(table.ActivityTriggers)) {
			try {
				table.ActivityTriggers.splice(0, table.ActivityTriggers.length, ...ActivityTriggers);
				triggersOk = true;
			} catch (e) { console.warn(`${LOG} could not replace ActivityTriggers:`, e); }
		}
		console.log(`${LOG} ActivityTriggers replaced: ${triggersOk}`);

		if (merged === 0 && !triggersOk) {
			console.warn(
				`${LOG} LCE's tables are locked. LCE most likely reads the bce_* globals once at engine start, ` +
				`so this script must run BEFORE LCE's engine starts (i.e. before login), not after.`
			);
		}

		// Diagnostics: use these in the console after triggering an emote/activity.
		w.FBCE_Nabi_debug = () => ({
			lceVersion: LCE.version,
			engineStarted: LCE.isExpressionEngineStarted?.(),
			faceComponents: LCE.getFaceComponents?.(),
			hookFailures: LCE.getHookFailures?.(),
			queue: LCE.getExpressionQueue?.(),
			mergedKeys: Object.keys(EventExpressions).filter((k) => k in (LCE.expressionData || {})),
		});
		console.log(`${LOG} run FBCE_Nabi_debug() in the console for engine status`);
	}

	/* ------------------------------------------------------------------ */
	/*  MAIN                                                               */
	/* ------------------------------------------------------------------ */

	const ready = await waitFor(() => !!w.Player?.Name && (hasWCE() || hasLCE()));
	if (!ready) {
		console.warn(
			`${LOG} timed out. Player:`, !!w.Player?.Name,
			"WCE/FBC hook:", hasWCE(),
			"LCE:", hasLCE()
		);
		// Still expose the globals in case an extension loads late and reads them.
		installGlobals();
		return;
	}

	// Always keep the original behaviour so WCE / FBC keep working exactly as before.
	installGlobals();

	// LCE has its own expression engine and does not define the WCE hook.
	if (hasLCE() && !hasWCE()) {
		installLCE();
	} else if (hasWCE()) {
		console.log(`${LOG} WCE/FBC detected, globals installed.`);
	}
})();
