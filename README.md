# Telegram Join Request Tracker

This project receives Telegram `chat_join_request` webhook updates.

A conversion is counted only when Telegram sends a real `chat_join_request`.
Button clicks and approved members are not counted as conversions.

Meta Conversions API will be connected after the Telegram webhook is verified.
