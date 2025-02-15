import os
import krpre  # 한글 전처리
from konlpy.tag import Komoran  # 형태소 분석
import gensim
import consql as cs


model = gensim.models.Word2Vec.load(os.path.join(os.path.dirname(__file__),'ko.bin'))
model.min_count=1  # 단어 하나만 있어도 훈련
komoran=krpre.komoran()

stopword=krpre.Stopword()

n=0
with cs.ex() as ce:
	routine=ce.q('SELECT name FROM routine;')  # 서버에서 루틴 이름 가져오기
	routine=[r[0] for r in routine]
	for r in routine:
		r = krpre.Clean_text(r)
		r = komoran.nouns(r, 0)
		r = stopword.Remove(r)
	print(r)
	for w in r:
		if w in model.wv.vocab:
			print('true')
		else:
			print('false')
		n+=1
		if(n>=50):
			break
	# for line in f:

	routine=[stopword.Remove(komoran.nouns(krpre.Clean_text(r),0))for r in routine]
	print(routine)
	model.build_vocab(routine, update=True)

	model.train(routine,total_examples=model.corpus_count,epochs=model.iter)

	model.save(os.path.join(os.path.dirname(__file__),'kosql.bin'))
	model=gensim.models.Word2Vec.load(os.path.join(os.path.dirname(__file__),'kosql.bin'))

for r in routine:
	print(r)
	for w in r:
		if w in model.wv.vocab:
			print('true')
		else:
			print('false')
		n+=1
		if(n>=50):
			break
