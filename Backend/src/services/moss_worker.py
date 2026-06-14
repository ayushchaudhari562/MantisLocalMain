import sys
import json
import os
import traceback

try:
    from moss import MossClient
except ImportError:
    print(json.dumps({"error": "inferedge-moss not installed globally or accessible"}))
    sys.exit(1)

PROJECT_ID = os.getenv("MOSS_PROJECT_ID")
PROJECT_KEY = os.getenv("MOSS_PROJECT_KEY")

if not PROJECT_ID or not PROJECT_KEY:
    print(json.dumps({"error": "Missing MOSS credentials in environment"}))
    sys.exit(1)

try:
    client = MossClient(project_id=PROJECT_ID, project_key=PROJECT_KEY)
except Exception as e:
    print(json.dumps({"error": f"Failed to initialize MossClient: {str(e)}"}))
    sys.exit(1)

def upload_chunks(index_name, chunks):
    try:
        # Assuming the standard Moss 1.4 API structure for insertion
        # We pass documents as a list of dicts with a 'text' field
        client.add(index_name=index_name, documents=[{"text": c} for c in chunks])
        return {"status": "success", "indexed": len(chunks)}
    except Exception as e:
        return {"error": f"Moss upload error: {str(e)}"}

def search_moss(index_name, query):
    try:
        results = client.query(index_name=index_name, query=query)
        
        # Format results nicely assuming they return an object/dict with a 'text' or 'content' property
        texts = []
        if isinstance(results, list):
            for r in results:
                if isinstance(r, dict):
                    texts.append(r.get('text', str(r)))
                elif hasattr(r, 'text'):
                    texts.append(r.text)
                else:
                    texts.append(str(r))
        return {"status": "success", "results": texts}
    except Exception as e:
        return {"error": f"Moss query error: {str(e)}"}

if __name__ == "__main__":
    try:
        command = sys.argv[1]
        input_data = sys.stdin.read()
        
        if not input_data.strip():
            print(json.dumps({"error": "No input provided"}))
            sys.exit(1)
            
        data = json.loads(input_data)
        
        if command == "upload":
            res = upload_chunks(data.get("index_name"), data.get("chunks", []))
            print(json.dumps(res))
            
        elif command == "search":
            res = search_moss(data.get("index_name"), data.get("query"))
            print(json.dumps(res))
            
        else:
            print(json.dumps({"error": "Unknown command"}))
            
    except Exception as e:
        print(json.dumps({"error": f"Worker crash: {str(e)}\n{traceback.format_exc()}"}))
