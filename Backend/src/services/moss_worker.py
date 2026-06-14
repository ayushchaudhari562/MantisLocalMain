import sys
import json
import os
import asyncio
import traceback

try:
    from moss import MossClient, DocumentInfo
except ImportError:
    print(json.dumps({"error": "inferedge-moss not installed globally or accessible"}), flush=True)
    sys.exit(1)

PROJECT_ID = os.getenv("MOSS_PROJECT_ID")
PROJECT_KEY = os.getenv("MOSS_PROJECT_KEY")

if not PROJECT_ID or not PROJECT_KEY:
    print(json.dumps({"error": "Missing MOSS credentials in environment"}), flush=True)
    sys.exit(1)

try:
    client = MossClient(project_id=PROJECT_ID, project_key=PROJECT_KEY)
except Exception as e:
    print(json.dumps({"error": f"Failed to initialize MossClient: {str(e)}"}), flush=True)
    sys.exit(1)

loaded_indexes = set()

async def upload_chunks(index_name, chunks):
    try:
        cleaned_chunks = []
        for c in chunks:
            cleaned = c.encode('utf-8', 'ignore').decode('utf-8')
            cleaned_chunks.append(cleaned)
        docs = [DocumentInfo(id=str(i), text=c) for i, c in enumerate(cleaned_chunks)]
        
        try:
            await client.create_index(name=index_name, docs=docs)
        except Exception as create_err:
            err_msg = str(create_err).lower()
            if 'already exists' in err_msg or 'duplicate' in err_msg:
                await client.add_docs(name=index_name, docs=docs)
            else:
                raise create_err
        
        loaded_indexes.add(index_name)
        return {"status": "success", "indexed": len(chunks)}
    except Exception as e:
        return {"error": f"Moss upload error: {str(e)}"}

async def search_moss(index_name, query):
    try:
        if index_name not in loaded_indexes:
            try:
                await client.load_index(name=index_name)
                loaded_indexes.add(index_name)
            except Exception:
                pass
        
        results = await client.query(name=index_name, query=query)
        texts = []
        if hasattr(results, 'docs'):
            for d in results.docs:
                texts.append(getattr(d, 'text', str(d)))
        return {"status": "success", "results": texts}
    except Exception as e:
        return {"error": f"Moss query error: {str(e)}"}

def main():
    print(json.dumps({"status": "ready"}), flush=True)
    
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
            
            line_str = line.strip()
            if not line_str:
                continue
            
            data = json.loads(line_str)
            command = data.get("command")
            
            if command == "upload":
                res = asyncio.run(upload_chunks(data.get("index_name"), data.get("chunks", [])))
            elif command == "search":
                res = asyncio.run(search_moss(data.get("index_name"), data.get("query")))
            elif command == "ping":
                res = {"status": "pong"}
            else:
                res = {"error": f"Unknown command: {command}"}
            
            print(json.dumps(res), flush=True)
            
        except Exception as e:
            print(json.dumps({"error": f"Worker error: {str(e)}\n{traceback.format_exc()}"}), flush=True)

if __name__ == "__main__":
    main()
