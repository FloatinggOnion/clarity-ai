"use client";

import React, { useState } from "react";
import Script from "next/script";
import { fira_code } from "@/lib/font";


type Props = {};

const Contact = (props: Props) => {
	return (
		<section className="h-[60vh] w-full flex flex-col items-center space-y-4">
            <div className="text-center space-y-4">
                <h3 className="text-3xl">Sounds exciting?</h3>
                <p className="text-neutral-400 text-sm">Be the first to know when we launch.</p>
            </div>

            {/* <form action="post" className="flex flex-col gap-4 w-[50%]">
                <input type="email" name="email" id="email" placeholder="example@clarity.ai" className="border border-neutral-400 px-4 py-2 h-12 rounded" />
                <button type="submit" className="bg-green-500 w-full px-4 py-4 rounded text-sm ">Join Waitlist</button>
            </form> */}

            <div className={`w-full flex items-center justify-center self-center`}>
				<div id="getWaitlistContainer" data-waitlist_id="22516" data-widget_type="WIDGET_1" className="flex justify-center"></div>
				<link rel="stylesheet" type="text/css" href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"/>
				<Script src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></Script>
			</div>
        </section>
	);
};

export default Contact;
