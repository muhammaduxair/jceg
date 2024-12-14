import json
import re
from fastapi import HTTPException


def clean_and_parse_json(response):
    # First, try to parse the response as-is
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        # If parsing fails, proceed with cleaning and parsing
        pass

    try:
        # Step 1: Try to find a JSON object in the response
        json_match = re.search(r'\{.*\}', response, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
        else:
            raise HTTPException(
                status_code=422, detail="No JSON object found in the response")

        # Step 2: Handle multiline strings and remove invalid control characters
        json_str = re.sub(
            r':\s*"([^"]*?)"', lambda m: ': ' + json.dumps(m.group(1)), json_str)

        # Step 3: Ensure all keys are double-quoted
        json_str = re.sub(r"(\w+):", r'"\1":', json_str)

        # Step 4: Replace single quotes with double quotes for string values
        # json_str = re.sub(r"'([^']*)'", r'"\1"', json_str)

        # Step 5: Add missing commas between elements
        json_str = re.sub(r'}\s*{', '},{', json_str)
        json_str = re.sub(r'"\s*"', '","', json_str)
        json_str = re.sub(r']\s*\[', '],[', json_str)

        # Step 6: Remove trailing commas
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*]', ']', json_str)

        # Step 7: Parse the JSON string
        try:
            parsed_json = json.loads(json_str)
        except json.JSONDecodeError as e:
            # If parsing fails, try to clean the string further
            json_str = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', json_str)
            try:
                parsed_json = json.loads(json_str)
            except json.JSONDecodeError as e:
                raise HTTPException(
                    status_code=422, detail=f"Failed to parse JSON after cleaning. Error: {str(e)}")

        # Step 8: Ensure all string values use double quotes when converted back to JSON
        cleaned_json = json.dumps(parsed_json, ensure_ascii=False)

        return json.loads(cleaned_json)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unexpected error while cleaning and parsing JSON: {str(e)}")
